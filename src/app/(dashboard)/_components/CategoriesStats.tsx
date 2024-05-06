"use client";

import { GetCategoriesStatsResponseType } from "@/app/api/stats/categories/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import axios from "axios";

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}

function CategoriesStats({ userSettings, from, to }: Props) {
  const statsQuery = useQuery<GetCategoriesStatsResponseType>({
    queryKey: ["overview", "stats", "categories", from, to],
    queryFn: async () => {
      const response = await axios.get(
        `/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(
          to
        )}`
      );
      return response.data;
    },
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard
          formatter={formatter}
          stats={statsQuery?.data || []}
          type={TransactionType.income}
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard
          formatter={formatter}
          stats={statsQuery?.data || []}
          type={TransactionType.expense}
        />
      </SkeletonWrapper>
    </div>
  );
}

export default CategoriesStats;

function CategoriesCard({
  formatter,
  stats,
  type,
}: {
  formatter: Intl.NumberFormat;
  stats: GetCategoriesStatsResponseType;
  type: TransactionType;
}) {
  const filteredStats = stats.filter((stat) => stat.type === type);
  const total = filteredStats.reduce(
    (acc, stat) => acc + (stat._sum?.amount || 0),
    0
  );
  return (
    <Card className="h-80 w-full col-span-6">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          {type === TransactionType.income ? "Incomes" : "Expenses"} by category
        </CardTitle>
      </CardHeader>
      <div className="flex items-center justify-between gap-2">
        {filteredStats.length === 0 ? (
          <div className="flex h-60 w-full flex-col items-center justify-center">
            No data for the selected period
            <p className="text-sm text-muted-foreground">
              Try selecting a different period or try adding a new
              <span
                className={cn(
                  "mx-1",
                  type === TransactionType.income
                    ? "text-emerald-500"
                    : "text-red-500"
                )}
              >
                {type === TransactionType.income ? "income" : "expense"}
              </span>
              transaction
            </p>
          </div>
        ) : (
          <ScrollArea className="h-60 w-full px-4">
            <div className="flex w-full flex-col gap-4 p-4">
              {filteredStats.map((stat) => {
                const amount = stat._sum?.amount || 0;
                const percentage = (amount * 100) / (total || amount);
                return (
                  <div key={stat.category} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center text-gray-400">
                        {stat.catergoryIcon} {stat.category}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {percentage.toFixed(0)}%
                        </span>
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatter.format(amount)}
                      </span>
                    </div>
                    <Progress
                      className="h-[6px]"
                      value={percentage}
                      indicator={
                        type === TransactionType.income
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
}
