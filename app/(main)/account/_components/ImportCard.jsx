import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import ImportTable from "./Import-table";

const requiredOptions = ["amount", "date", "description"];

function ImportCard({data, onCancel, onSubmit}) {

  const [selectedColoumns,setSelectedColoumns]=useState({});

  const headers=data[0];
  const body=data.slice(1);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className='border-none drop-shadow-sm '>
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className='text-xl line-clamp-1'>Import Transaction</CardTitle>
          <div className="flex items-center gap-x-2">
            <Button onClick={onCancel} size="sm">Cancel</Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
          headers={headers}
          body={body}
          selectedColoumns={selectedColoumns}
          onTableHeadSelectChange={()=>{}}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default ImportCard;
