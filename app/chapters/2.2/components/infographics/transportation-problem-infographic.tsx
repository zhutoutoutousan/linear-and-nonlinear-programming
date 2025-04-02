import { Card, CardContent } from "@/components/ui/card"
import { Factory, MapPin, Truck, Warehouse } from "lucide-react"

export function TransportationProblemInfographic() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Factory className="h-8 w-8 text-orange-500" />
              <span className="text-sm mt-2">Factory A</span>
              <span className="text-xs text-muted-foreground">Supply: 100</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Factory className="h-8 w-8 text-orange-500" />
              <span className="text-sm mt-2">Factory B</span>
              <span className="text-xs text-muted-foreground">Supply: 150</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Factory className="h-8 w-8 text-orange-500" />
              <span className="text-sm mt-2">Factory C</span>
              <span className="text-xs text-muted-foreground">Supply: 200</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Truck className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Shipping Routes</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <Warehouse className="h-4 w-4 text-blue-500" />
                <div className="text-sm font-medium">Warehouse X</div>
              </div>
              <div className="text-xs text-muted-foreground">Demand: 120</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <Warehouse className="h-4 w-4 text-blue-500" />
                <div className="text-sm font-medium">Warehouse Y</div>
              </div>
              <div className="text-xs text-muted-foreground">Demand: 180</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <Warehouse className="h-4 w-4 text-blue-500" />
                <div className="text-sm font-medium">Warehouse Z</div>
              </div>
              <div className="text-xs text-muted-foreground">Demand: 150</div>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Minimize total shipping costs while meeting supply and demand constraints
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 