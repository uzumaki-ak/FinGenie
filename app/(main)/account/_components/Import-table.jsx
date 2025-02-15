// import {
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Table } from "lucide-react";
// import React from "react";

// function ImportTable({
//   headers,
//   body,
//   selectedColoumns,
//   onTableHeadSelectChange,
// }) {
//   return (
//     <div className="rounded-md border overflow-hidden">
//       <Table>
//         <TableHeader className="bg-muted">
//           <TableRow>
//             {headers.map((item, index) => {
//               <TableHead key={index}>{index}</TableHead>;
//             })}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {body.map((row, index) => (
//             <TableRow>
//               {row.map((cell, index) => (
//                 <TableCell key={index}>{cell}</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

// export default ImportTable;


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function ImportTable({
  headers,
  body,
  selectedColoumns,
  onTableHeadSelectChange,
}) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ImportTable;
