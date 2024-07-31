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
/*
last12Months: An empty array to store the data for the last 12 months.
currentDate: A Date object representing the current date.
currentDate.setDate(currentDate.getDate() + 1): 
Increment the current date by 1 to ensure we are not missing any data from the current day.
*/
  const last12Months: MonthData[] = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
/*
  Loop Initialization: Start a loop that will run 12 times 
  (for the last 12 months), with i decrementing from 11 to 0.
*/

  for (let i = 11; i >= 0; i--) {
    
/*
Calculate End Date: Inside the loop, 
calculate the endDate for each month by 
subtracting i * 28 days from the current date. 
This approximates each month as 28 days to simplify the calculation.
*/
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );


/*
Calculate Start Date: Calculate the startDate by subtracting 28 days from the endDate. 
This gives a rough approximation of a month-long period ending at endDate.
*/
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );


/*
Format Month and Year: Create a string monthYear that
 represents the formatted month and year using toLocaleString. 
This formats the date as DD-MMM-YYYY (e.g., 15-Jul-2024).
*/
    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

/*
Count Documents: Use the Mongoose model to count the documents 
created between startDate and endDate. 
This is done using the countDocuments method with a filter on the createdAt field.
*/
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });
/*
    Push Data to Array: Add an object containing the monthYear and the count to the last12Months array.
*/
    last12Months.push({ month: monthYear, count });
  }
  /*
  Return Data: After the loop completes, return an object containing the last12Months array
  */
  return { last12Months };
}
