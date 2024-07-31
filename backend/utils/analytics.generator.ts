import { Document, Model } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}

/*
 Function Definition: This line declares an asynchronous 
 function generateLast12MonthsData that takes a 
 generic parameter T which extends Document. 
 This means the function works with any Mongoose document type.
 Parameters:   model: A Mongoose model of type T.
 Return Type: The function returns a promise that resolves to an object containing an array of MonthData
*/
export async function generateLast12MonthsData<T extends Document>(
  model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
/*

*/
  for (let i = 11; i >= 0; i--) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );


/*

*/
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );


/*

*/
    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

/*

*/
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    last12Months.push({ month: monthYear, count });
  }
  return { last12Months };
}
