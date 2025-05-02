import SysFetch from "../fetch"

const StatisticService = {
    getStatistics: () => SysFetch.get("/api/statistics"),
    getStatisticsTopProduct: (limit, startDay, endDay) => 
      SysFetch.get("/api/statistics/top-products", {params: {limit, startDay, endDay}}),
    getRevenue: (limit, startDay, endDay) => 
      SysFetch.get("/api/statistics/revenue", {params: {limit,startDay,endDay}})
  };

export default StatisticService;