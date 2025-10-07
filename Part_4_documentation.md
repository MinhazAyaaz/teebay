# Teebay - Product Renting and Buying/Selling Application
## Technical Documentation

### Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Part 1: User Authentication & Registration](#part-1-user-authentication--registration)
4. [Part 2: Product Management](#part-2-product-management)
5. [Part 3: Rent and Buy/Sell Functionality](#part-3-rent-and-buysell-functionality)
6. [Database Design](#database-design)
7. [API Design](#api-design)
8. [Frontend Implementation](#frontend-implementation)
9. [Corner Cases & Technical Decisions](#corner-cases--technical-decisions)
10. [Deployment & Infrastructure](#deployment--infrastructure)
11. [Future Enhancements](#future-enhancements)

---

## Project Overview

**Teebay** is a full-stack product renting and buying/selling application that allows users to:
- Register and authenticate
- Add, edit, and delete products with multi-page forms
- List products in multiple categories
- Buy and rent products from other users
- Track their purchase/rental history and sales

The application follows a modern microservices architecture with separate frontend and backend services, containerized with Docker for easy deployment.

---

## Architecture & Technology Stack

### Backend
- **Framework**: NestJS (Node.js)
- **API**: GraphQL with Apollo Server
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Simple string-based authentication (as per requirements)
- **Language**: TypeScript

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Mantine UI + Tailwind CSS
- **State Management**: Apollo Client for GraphQL
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (for frontend)
- **Database**: PostgreSQL 16
- **Package Manager**: pnpm

### Project Structure
```
sazim/
├── backend/                 # NestJS GraphQL API
│   ├── src/
│   │   ├── users/          # User management
│   │   ├── products/       # Product management
│   │   ├── orders/         # Order management
│   │   ├── prisma/         # Database service
│   │   └── common/         # Shared utilities
│   └── prisma/             # Database schema & migrations
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── graphql/        # GraphQL queries & mutations
│   │   ├── context/        # React context providers
│   │   └── types/          # TypeScript type definitions
└── docker-compose.yml      # Container orchestration
```

---

## Part 1: User Authentication & Registration

### Implementation Details

#### Backend Authentication
- **Simple String Matching**: As per requirements, authentication uses basic string comparison
- **Password Hashing**: Passwords are hashed using Node.js crypto module with SHA-256
- **Session Management**: User ID is stored in context for authenticated requests

#### Key Components

**User Service** (`backend/src/users/users.service.ts`):
```typescript
// Password hashing
private hash(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// User registration with duplicate email check
async createUser(createUserInput: CreateUserDto) {
  const user = await this.prisma.user.findFirst({
    where: { email: createUserInput.email },
  });
  if (user) {
    throw new HttpException("User with this email already exists", HttpStatus.BAD_REQUEST);
  }
  // ... create user logic
}

// Login with password verification
async loginUser(email: string, password: string) {
  const user = await this.prisma.user.findFirst({ where: { email } });
  if (!user || user.password !== this.hash(password)) {
    throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
  }
  // ... return user data
}
```

**GraphQL Resolvers**:
- `createUser`: User registration
- `loginUser`: User authentication
- `getCurrentUser`: Get authenticated user details

#### Frontend Authentication
- **Context Provider**: `AuthContext` manages authentication state
- **Protected Routes**: `ProtectedRoute` component guards authenticated pages
- **Form Handling**: React Hook Form with validation

#### Security Considerations
- Passwords are hashed before storage
- Email uniqueness is enforced at database level
- Authentication state is managed client-side (as per simple requirements)

---

## Part 2: Product Management

### Multi-Page Form Implementation

The product creation form is implemented as a 5-step wizard:

#### Step 1: Basic Information
- Product title (required)

#### Step 2: Categories
- Multi-select categories from predefined options:
  - ELECTRONICS
  - FURNITURE
  - HOME_APPLIANCES
  - SPORTING_GOODS
  - OUTDOOR
  - TOYS

#### Step 3: Description
- Product description (required)

#### Step 4: Pricing
- Sale price (required)
- Rent price (required)
- Rent interval (HOURLY, DAILY, WEEKLY, MONTHLY, YEARLY)

#### Step 5: Summary & Confirmation
- Review all entered information
- Submit the product

#### Key Features
- **Navigation**: Users can go back and forth between steps
- **Progress Indicator**: Visual progress bar shows completion status
- **Form Persistence**: Data is maintained across step navigation
- **Validation**: Each step validates required fields before proceeding

#### Implementation Details

**Frontend Form Logic** (`frontend/src/pages/AddProduct.tsx`):
```typescript
const [step, setStep] = useState(1);
const { register, handleSubmit, getValues, control } = useForm<CreateProductFormInput>();

// Step navigation
const nextStep = () => {
  if (step < 5) setStep(step + 1);
};

const prevStep = () => {
  if (step > 1) setStep(step - 1);
};

// Form submission
const onSubmit = async (data: CreateProductFormInput) => {
  // ... validation and submission logic
};
```

**Backend Product Service**:
- `createProduct`: Creates new product with categories
- `updateProduct`: Updates existing product
- `deleteProduct`: Soft deletes product (sets status to ARCHIVED)
- `getUserProducts`: Retrieves user's products

### Product Categories
Products can belong to multiple categories through a many-to-many relationship:

```sql
model ProductCategory {
  productId String @db.Uuid
  category  Category
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  @@id([productId, category])
}
```

---

## Part 3: Rent and Buy/Sell Functionality

### Order Management System

The application supports two types of orders:
1. **SALE**: One-time purchase
2. **RENT**: Time-based rental with start/end dates

#### Order Creation Process

**Buy Order** (`backend/src/orders/orders.service.ts`):
```typescript
async createBuyOrder(buyerId: string, productId: string) {
  return this.prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id: productId } });
    
    // Validation checks
    if (!product) throw new NotFoundException("Product not found");
    if (product.ownerId === buyerId) throw new BadRequestException("Cannot buy your own product");
    if (product.status !== ProductStatus.AVAILABLE) throw new BadRequestException("Product not available");
    if (!product.salePrice) throw new BadRequestException("Sale price not set");
    
    // Create order and update product status
    const order = await tx.order.create({
      data: {
        type: OrderType.SALE,
        productId,
        buyerId,
        amount: product.salePrice,
        status: OrderStatus.CONFIRMED,
      },
    });
    
    await tx.product.update({
      where: { id: productId },
      data: { status: ProductStatus.SOLD },
    });
    
    return order;
  });
}
```

**Rent Order**:
```typescript
async createRentOrder(buyerId: string, productId: string, startISO: string, endISO: string) {
  // Date validation
  const start = new Date(startISO);
  const end = new Date(endISO);
  if (!(start < end)) throw new BadRequestException("Invalid date range");
  
  // Overlap checking
  const overlappingRent = await tx.order.findFirst({
    where: {
      productId,
      type: OrderType.RENT,
      status: OrderStatus.CONFIRMED,
      startDate: { lt: end },
      endDate: { gt: start },
    },
  });
  
  if (overlappingRent) {
    throw new BadRequestException("Selected dates overlap with existing rental");
  }
  
  // Calculate rental amount based on duration
  const days = Math.max(1, differenceInCalendarDays(end, start));
  const amount = product.rentPrice.toNumber() * days;
}
```

### Order History & Tracking

**User Orders**: All purchases and rentals made by the user
**User Sales**: All sales and rentals of the user's products

The History page (`frontend/src/pages/History.tsx`) displays:
- Purchase history (orders as buyer)
- Sales history (orders as seller)
- Order details including product information, amounts, and dates

---

## Database Design

### Core Entities

#### User Model
```sql
model User {
  id        String   @id @default(uuid()) @db.Uuid
  firstName String
  lastName  String
  address   String
  phone     String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  products  Product[] @relation("UserProducts")
  orders    Order[]   @relation("UserOrders")
}
```

#### Product Model
```sql
model Product {
  id           String           @id @default(uuid()) @db.Uuid
  ownerId      String           @db.Uuid
  title        String
  description  String?
  condition    Condition        @default(GOOD)
  status       ProductStatus    @default(AVAILABLE)
  salePrice    Decimal?         @db.Decimal(12,2)
  rentPrice    Decimal?         @db.Decimal(12,2)
  rentInterval RentInterval?    @default(DAILY)
  currency     String           @default("BDT")
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
  
  owner        User             @relation("UserProducts", fields: [ownerId], references: [id], onDelete: Cascade)
  categories   ProductCategory[]
  orders       Order[]
}
```

#### Order Model
```sql
model Order {
  id        String       @id @default(uuid()) @db.Uuid
  type      OrderType
  status    OrderStatus  @default(PENDING)
  productId String       @db.Uuid
  buyerId   String       @db.Uuid
  amount    Decimal      @db.Decimal(12,2)
  currency  String       @default("BDT")
  startDate DateTime?    -- For rentals
  endDate   DateTime?    -- For rentals
  createdAt DateTime     @default(now())
  
  product   Product      @relation(fields: [productId], references: [id], onDelete: Restrict)
  buyer     User         @relation("UserOrders", fields: [buyerId], references: [id], onDelete: Restrict)
}
```

### Enums
- **Category**: ELECTRONICS, FURNITURE, HOME_APPLIANCES, SPORTING_GOODS, OUTDOOR, TOYS
- **ProductStatus**: AVAILABLE, SOLD, RENTED, ARCHIVED
- **OrderType**: SALE, RENT
- **OrderStatus**: PENDING, CONFIRMED, CANCELLED
- **Condition**: NEW, LIKE_NEW, GOOD, FAIR
- **RentInterval**: HOURLY, DAILY, WEEKLY, MONTHLY, YEARLY

---

## API Design

### GraphQL Schema

The API uses GraphQL with the following main operations:

#### User Operations
```graphql
type Query {
  getCurrentUser: User
  findUserById(userId: String!): User
  findUserByEmail(email: String!): User
}

type Mutation {
  createUser(createUserInput: CreateUserInput!): UserResponse
  loginUser(loginUserInput: LoginUserInput!): UserResponse
}
```

#### Product Operations
```graphql
type Query {
  getAllProducts(search: String, page: Int, pageSize: Int): [Product]
  getProductById(productId: String!): Product
  getCurrentUserProducts: [Product]
}

type Mutation {
  createProduct(createProductInput: CreateProductInput!): ProductResponse
  updateProduct(updateProductInput: UpdateProductInput!): ProductResponse
  deleteProduct(productId: String!): ProductResponse
}
```

#### Order Operations
```graphql
type Query {
  getCurrentUserOrders: [Order]
  getCurrentUserSales: [Order]
}

type Mutation {
  createBuyOrder(input: CreateBuyOrderInput!): OrderResponse
  createRentOrder(input: CreateRentOrderInput!): OrderResponse
}
```

---

## Frontend Implementation

### Component Architecture

#### Page Components
- **Home**: Product listing with search and pagination
- **AddProduct**: Multi-step product creation form
- **SingleProduct**: Product details with buy/rent options
- **MyProducts**: User's product management
- **History**: Order and sales history
- **Login/Signup**: Authentication pages

#### Reusable Components
- **ProductCard**: Product display component
- **Navbar**: Navigation with authentication state
- **ProtectedRoute**: Route protection wrapper
- **ProductCardLoader**: Loading skeleton

#### State Management
- **AuthContext**: Global authentication state
- **Apollo Client**: GraphQL data fetching and caching
- **React Hook Form**: Form state management

### UI/UX Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Toast notifications for user feedback
- **Form Validation**: Real-time validation with helpful error messages
- **Progress Indicators**: Visual feedback for multi-step processes

---

## Corner Cases & Technical Decisions

### 1. Rental Date Overlap Prevention
**Challenge**: Preventing overlapping rental periods for the same product.

**Solution**: 
- Application-level overlap checking before order creation
- Database-level exclusion constraints (recommended for production)
- Clear error messages for users when overlaps occur

```typescript
const overlappingRent = await tx.order.findFirst({
  where: {
    productId,
    type: OrderType.RENT,
    status: OrderStatus.CONFIRMED,
    startDate: { lt: end },
    endDate: { gt: start },
  },
});
```

### 2. Product Status Management
**Challenge**: Ensuring products can't be sold/rented when already unavailable.

**Solution**:
- Atomic transactions for order creation
- Status validation before order processing
- Automatic status updates (AVAILABLE → SOLD/RENTED)

### 3. Multi-Category Product Support
**Challenge**: Products can belong to multiple categories.

**Solution**:
- Many-to-many relationship with junction table
- Efficient querying with Prisma includes
- Frontend multi-select component

### 4. Form State Persistence
**Challenge**: Maintaining form data across multi-step navigation.

**Solution**:
- React Hook Form with controlled components
- Form data persistence in component state
- Step validation before navigation

### 5. Authentication Simplicity
**Challenge**: Implementing simple authentication as per requirements.

**Solution**:
- Basic string-based password hashing
- Client-side session management
- Simple context-based authentication state

### 6. Currency and Pricing
**Challenge**: Handling decimal precision for prices.

**Solution**:
- PostgreSQL DECIMAL(12,2) for precise monetary values
- Frontend number input validation
- Consistent currency display (BDT)

---

## Deployment & Infrastructure

### Docker Configuration

#### Backend Container
```dockerfile
FROM node:22-alpine AS base
# Multi-stage build for optimization
# Prisma client generation
# Production dependencies only
```

#### Frontend Container
```dockerfile
FROM node:22-alpine AS build
# Build React application
# Copy to Nginx for serving
```

#### Database
- PostgreSQL 16 with persistent volume
- Automatic migration execution on startup
- Environment-based configuration

### Docker Compose Setup
```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: sazim
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/sazim
    depends_on:
      - db
  
  frontend:
    build: ./frontend
    ports:
      - "5173:80"
    depends_on:
      - backend
```

### Environment Configuration
- Database connection strings
- CORS origins for API access
- GraphQL endpoint configuration
- Port mappings

---

## Future Enhancements

### Security Improvements
1. **JWT Authentication**: Replace simple string matching with JWT tokens
2. **Password Hashing**: Implement bcrypt for stronger password security
3. **Rate Limiting**: Add API rate limiting for production use
4. **Input Validation**: Enhanced server-side validation

### Feature Enhancements
1. **Image Upload**: Product image support with cloud storage
2. **Search & Filtering**: Advanced product search with filters
3. **Payment Integration**: Real payment processing
4. **Notifications**: Email/SMS notifications for orders
5. **Reviews & Ratings**: User feedback system
6. **Admin Panel**: Administrative interface for platform management

### Technical Improvements
1. **Caching**: Redis for improved performance
2. **Monitoring**: Application performance monitoring
3. **Testing**: Comprehensive test suite
4. **CI/CD**: Automated deployment pipeline
5. **Database Optimization**: Query optimization and indexing

### Scalability Considerations
1. **Microservices**: Break down into smaller services
2. **Load Balancing**: Multiple backend instances
3. **Database Sharding**: Horizontal database scaling
4. **CDN**: Content delivery network for static assets

---

## Conclusion

The Teebay application successfully implements all required features with a modern, scalable architecture. The multi-page form provides an excellent user experience, while the GraphQL API ensures efficient data fetching. The Docker-based deployment makes it easy to run and scale the application.

Key strengths:
- Clean separation of concerns
- Type-safe development with TypeScript
- Modern UI/UX with responsive design
- Comprehensive error handling
- Atomic database transactions
- Containerized deployment

The application is ready for production use with the suggested security and feature enhancements for a full-scale marketplace platform.
