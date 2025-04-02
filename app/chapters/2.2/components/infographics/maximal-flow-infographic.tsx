import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Circle, Droplet, Network } from "lucide-react"

export function MaximalFlowInfographic() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <Network className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Network Flow</span>
          </div>
          
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col items-center">
                <Circle className="h-8 w-8 text-green-500 fill-green-500" />
                <span className="text-sm mt-2">Source</span>
              </div>
              <div className="flex-1 flex justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex flex-col items-center">
                <Circle className="h-8 w-8 text-red-500 fill-red-500" />
                <span className="text-sm mt-2">Sink</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Circle className="h-6 w-6 text-blue-500" />
                <span className="text-xs mt-1">Node 2</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Circle className="h-6 w-6 text-blue-500" />
                <span className="text-xs mt-1">Node 3</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <Circle className="h-6 w-6 text-blue-500" />
                <span className="text-xs mt-1">Node 4</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-center">
                <div className="text-xs font-medium">Capacity: 5</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-center">
                <div className="text-xs font-medium">Capacity: 3</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-center">
                <div className="text-xs font-medium">Capacity: 4</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Droplet className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Flow Conservation</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="text-sm font-medium">Source</div>
              <div className="text-xs text-muted-foreground">Net outflow = f</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="text-sm font-medium">Sink</div>
              <div className="text-xs text-muted-foreground">Net inflow = f</div>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Find the maximum flow from source to sink while respecting capacity constraints
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 