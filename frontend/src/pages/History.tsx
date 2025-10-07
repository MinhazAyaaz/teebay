/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScrollArea, Tabs } from "@mantine/core";
import { BoxIcon, DollarSign, HandHelping, ShoppingCart } from "lucide-react";
import ProductCardLoader from "../components/ProductCardLoader";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import ProductNotFound from "../components/ProductNotFound";
import { useQuery } from "@apollo/client/react";
import { QUERY_GET_USER_ORDERS, QUERY_GET_USER_SALES } from "../graphql/orders/queries";
import type { GetUserOrdersQuery, GetUserOrdersVars, GetUserSalesQuery, GetUserSalesVars, Order } from "../types/order";

const History = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [sales, setSales] = useState<Order[]>([]);



  const { data: ordersData, loading: ordersLoading, refetch: ordersRefetch } = useQuery<GetUserOrdersQuery, GetUserOrdersVars>(
    QUERY_GET_USER_ORDERS,
    {
      variables: { search: "", page: 1, pageSize: 10 },
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
    }
  );

  const { data: salesData, loading: salesLoading, refetch: salesRefetch } = useQuery<GetUserSalesQuery, GetUserSalesVars>(
    QUERY_GET_USER_SALES,
    {
      variables: { search: "", page: 1, pageSize: 10 },
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (ordersData?.getCurrentUserOrders?.length && ordersData.getCurrentUserOrders.length > 0) { 
      setOrders(ordersData.getCurrentUserOrders || []);
    }
  }, [ordersData]);

  useEffect(() => {
    if (salesData?.getCurrentUserSales?.length && salesData.getCurrentUserSales.length > 0) { 
      setSales(salesData.getCurrentUserSales || []);
    }
  }, [salesData]);

  useEffect(() => {
    const id = setTimeout(() => {
      salesRefetch({ search: "", page: 1, pageSize: 10 });
    }, 300);
    return () => clearTimeout(id);
  }, [salesRefetch]);

  useEffect(() => {
    const id = setTimeout(() => {
      ordersRefetch({ search: "", page: 1, pageSize: 10 });
    }, 300);
    return () => clearTimeout(id);
  }, [ordersRefetch]);

  return (
    <div className="h-screen w-screen flex flex-col items-center mt-10 gap-8">
      <div className="flex flex-row gap-8 w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <Tabs defaultValue="bought" className="w-full">
          <Tabs.List grow justify="center">
            <Tabs.Tab
              value="bought"
              color="black"
              className="hover:bg-blue-100! duration-200"
              leftSection={<ShoppingCart />}
            >
              {" "}
              Bought
            </Tabs.Tab>
            <Tabs.Tab
              value="sold"
              color="black"
              className="hover:bg-blue-100! duration-200"
              leftSection={<DollarSign />}
            >
              Sold
            </Tabs.Tab>
            <Tabs.Tab
              value="borrowed"
              color="black"
              className="hover:bg-blue-100! duration-200"
              leftSection={<HandHelping />}
            >
              Borrowed
            </Tabs.Tab>
            <Tabs.Tab
              value="lent"
              color="black"
              className="hover:bg-blue-100! duration-200"
              leftSection={<BoxIcon />}
            >
              Lent
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="bought">
            <ScrollArea h={690} className="w-full max-w-6xl mt-6" scrollbars="y">
              {!ordersLoading && orders.length === 0 && <ProductNotFound />}
              {ordersLoading && orders.length === 0 ? (
                <ProductCardLoader />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4">
                  {orders?.filter(o => o.type === 'SALE').map((order: Order) => (
                    <ProductCard
                      key={order.id}
                      product={order.product} 
                      type="all-products"
                      hover={false}
                      refetch={ordersRefetch}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </Tabs.Panel>
            <Tabs.Panel value="sold">
            <ScrollArea h={690} className="w-full max-w-6xl mt-6" scrollbars="y">
              {!salesLoading && sales.length === 0 && <ProductNotFound />}
              {salesLoading && sales.length === 0 ? (
                <ProductCardLoader />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4">
                  {sales?.filter(o => o.type === 'SALE').map((sale: Order) => ( 
                    <ProductCard
                      key={sale.id}
                      product={sale.product}
                      type="all-products"
                      hover={false}
                      refetch={salesRefetch}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </Tabs.Panel>
          <Tabs.Panel value="borrowed">
            <ScrollArea h={690} className="w-full max-w-6xl mt-6" scrollbars="y">
              {!ordersLoading && orders.length === 0 && <ProductNotFound />}
              {ordersLoading && orders.length === 0 ? (
                <ProductCardLoader />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4">
                  {orders?.filter(o => o.type === 'RENT').map((order: Order) => (
                    <ProductCard
                      key={order.id}
                      product={order.product}
                      type="all-products"
                      hover={false}
                      refetch={ordersRefetch}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </Tabs.Panel>
          <Tabs.Panel value="lent">
            <ScrollArea h={690} className="w-full max-w-6xl mt-6" scrollbars="y">
              {!salesLoading && sales.length === 0 && <ProductNotFound />}
              {salesLoading && sales.length === 0 ? (
                <ProductCardLoader />
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4">
                  {sales?.filter(o => o.type === 'RENT').map((sale: Order) => ( 
                    <ProductCard
                      key={sale.id}
                      product={sale.product}
                      type="all-products"
                      hover={false}
                      refetch={salesRefetch}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default History;
