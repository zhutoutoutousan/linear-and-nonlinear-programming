"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Warehouse, TrendingUp, TrendingDown, DollarSign, Package } from "lucide-react"

export function WarehousingInfographic() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Warehouse className="h-5 w-5" />
          Warehousing Problem
        </CardTitle>
        <CardDescription>
          Optimize warehouse operations by buying and selling stock to maximize profit over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Problem Visualization */}
          <div className="flex flex-col items-center">
            <div className="relative w-full h-40 border rounded-lg bg-muted p-4 mb-4">
              <div className="absolute top-2 left-2 flex items-center gap-1 text-sm font-medium">
                <Package className="h-4 w-4" />
                <span>Warehouse Capacity: C</span>
              </div>
              
              {/* Time Periods */}
              <div className="flex justify-between items-center h-full mt-8">
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium">Period 1</div>
                  <div className="flex items-center gap-1 mt-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm">p₁</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium">Period 2</div>
                  <div className="flex items-center gap-1 mt-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm">p₂</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium">Period 3</div>
                  <div className="flex items-center gap-1 mt-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm">p₃</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Components */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-1">
                <Package className="h-4 w-4" />
                Stock Variables
              </h3>
              <ul className="text-sm space-y-1">
                <li>xᵢ: Stock level at beginning of period i</li>
                <li>uᵢ: Amount bought during period i</li>
                <li>sᵢ: Amount sold during period i</li>
                <li>zᵢ: Slack variable for capacity constraint</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Parameters
              </h3>
              <ul className="text-sm space-y-1">
                <li>C: Warehouse capacity</li>
                <li>r: Holding cost per unit per period</li>
                <li>pᵢ: Price in period i</li>
                <li>n: Number of time periods</li>
              </ul>
            </div>
          </div>

          {/* Mathematical Formulation */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Mathematical Formulation</h3>
            <div className="bg-muted p-3 rounded-md text-sm">
              <div className="mb-2">
                <span className="font-medium">Objective:</span> Maximize ∑<sub>i=1</sub><sup>n</sup>(pᵢ(sᵢ - uᵢ) - rxᵢ)
              </div>
              <div className="mb-2">
                <span className="font-medium">Subject to:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>x<sub>i+1</sub> = xᵢ + uᵢ - sᵢ for i = 1, 2, ..., n-1</li>
                <li>0 = x<sub>n</sub> + u<sub>n</sub> - s<sub>n</sub></li>
                <li>xᵢ + zᵢ = C for i = 2, ..., n</li>
                <li>x₁ = 0, xᵢ > 0, uᵢ > 0, sᵢ > 0, zᵢ > 0</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 