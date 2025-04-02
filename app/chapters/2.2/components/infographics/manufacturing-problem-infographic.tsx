import { Card, CardContent } from "@/components/ui/card"
import { Factory, Package, Settings, Wrench } from "lucide-react"

export function ManufacturingProblemInfographic() {
  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Package className="h-8 w-8 text-blue-500" />
              <span className="text-sm mt-2">Product A</span>
              <span className="text-xs text-muted-foreground">$100/unit</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Package className="h-8 w-8 text-green-500" />
              <span className="text-sm mt-2">Product B</span>
              <span className="text-xs text-muted-foreground">$150/unit</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Package className="h-8 w-8 text-purple-500" />
              <span className="text-sm mt-2">Product C</span>
              <span className="text-xs text-muted-foreground">$200/unit</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Resource Constraints</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <Wrench className="h-4 w-4 text-orange-500" />
                <div className="text-sm font-medium">Labor</div>
              </div>
              <div className="text-xs text-muted-foreground">≤ 1000 hours</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <Factory className="h-4 w-4 text-blue-500" />
                <div className="text-sm font-medium">Machine Time</div>
              </div>
              <div className="text-xs text-muted-foreground">≤ 800 hours</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2">
                <Wrench className="h-4 w-4 text-green-500" />
                <div className="text-sm font-medium">Materials</div>
              </div>
              <div className="text-xs text-muted-foreground">≤ 500 units</div>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Maximize revenue while staying within resource constraints
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 