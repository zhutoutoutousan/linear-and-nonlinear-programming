import { Card, CardContent } from "@/components/ui/card"
import { Apple, Beef, Carrot, Fish, Milk, Utensils } from "lucide-react"

export function DietProblemInfographic() {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Apple className="h-8 w-8 text-red-500" />
              <span className="text-sm mt-2">$2.00</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Beef className="h-8 w-8 text-red-700" />
              <span className="text-sm mt-2">$5.00</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Carrot className="h-8 w-8 text-orange-500" />
              <span className="text-sm mt-2">$1.50</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Fish className="h-8 w-8 text-blue-500" />
              <span className="text-sm mt-2">$4.00</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Milk className="h-8 w-8 text-blue-300" />
              <span className="text-sm mt-2">$3.00</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Nutritional Requirements</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="text-sm font-medium">Protein</div>
              <div className="text-xs text-muted-foreground">≥ 50g/day</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="text-sm font-medium">Carbs</div>
              <div className="text-xs text-muted-foreground">≥ 200g/day</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="text-sm font-medium">Fat</div>
              <div className="text-xs text-muted-foreground">≥ 30g/day</div>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Find the minimum cost combination of foods that meets all nutritional requirements
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 