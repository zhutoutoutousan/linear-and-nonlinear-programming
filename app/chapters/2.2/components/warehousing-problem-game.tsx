"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Warehouse, TrendingUp, TrendingDown, DollarSign, Package, RefreshCw, CheckCircle, XCircle, HelpCircle } from "lucide-react"

interface Period {
  price: number
  buy: number
  sell: number
  stock: number
  profit: number
}

export function WarehousingProblemGame() {
  const [periods, setPeriods] = useState<Period[]>([
    { price: 10, buy: 0, sell: 0, stock: 0, profit: 0 },
    { price: 15, buy: 0, sell: 0, stock: 0, profit: 0 },
    { price: 12, buy: 0, sell: 0, stock: 0, profit: 0 },
  ])
  const [capacity, setCapacity] = useState(100)
  const [holdingCost, setHoldingCost] = useState(1)
  const [currentPeriod, setCurrentPeriod] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [totalProfit, setTotalProfit] = useState(0)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [buyInput, setBuyInput] = useState("0")
  const [sellInput, setSellInput] = useState("0")

  // Calculate stock levels, profits, and validity
  const calculateMetrics = useCallback(() => {
    const newPeriods = [...periods]
    
    // Calculate stock levels and profits
    for (let i = 0; i < newPeriods.length; i++) {
      if (i === 0) {
        // First period: stock is just buy - sell
        newPeriods[i].stock = newPeriods[i].buy - newPeriods[i].sell
        newPeriods[i].profit = newPeriods[i].price * (newPeriods[i].sell - newPeriods[i].buy) - 
                               holdingCost * newPeriods[i].stock
      } else {
        // Other periods: stock is previous stock + buy - sell
        newPeriods[i].stock = newPeriods[i-1].stock + newPeriods[i].buy - newPeriods[i].sell
        newPeriods[i].profit = newPeriods[i].price * (newPeriods[i].sell - newPeriods[i].buy) - 
                               holdingCost * newPeriods[i].stock
      }
    }
    
    // Calculate total profit
    const profit = newPeriods.reduce((sum, period) => sum + period.profit, 0)
    
    // Check if solution is valid
    const valid = newPeriods.every(period => 
      period.stock >= 0 && 
      period.stock <= capacity && 
      period.buy >= 0 && 
      period.sell >= 0
    ) && newPeriods[newPeriods.length - 1].stock === 0
    
    return { newPeriods, profit, valid }
  }, [periods, capacity, holdingCost])

  // Update metrics when periods change
  useEffect(() => {
    const { profit, valid } = calculateMetrics()
    setTotalProfit(profit)
    setIsValid(valid)
  }, [calculateMetrics])

  // Update input values when current period changes
  useEffect(() => {
    setBuyInput(periods[currentPeriod].buy.toString())
    setSellInput(periods[currentPeriod].sell.toString())
  }, [currentPeriod, periods])

  const handleBuyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyInput(e.target.value)
  }, [])

  const handleSellChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSellInput(e.target.value)
  }, [])

  const applyChanges = useCallback(() => {
    const buyValue = parseInt(buyInput) || 0
    const sellValue = parseInt(sellInput) || 0
    
    // Validate inputs
    if (isNaN(buyValue) || isNaN(sellValue) || buyValue < 0 || sellValue < 0) {
      return
    }
    
    const newPeriods = [...periods]
    newPeriods[currentPeriod].buy = buyValue
    newPeriods[currentPeriod].sell = sellValue
    
    // Calculate stock and profit for this period
    if (currentPeriod === 0) {
      newPeriods[currentPeriod].stock = buyValue - sellValue
      newPeriods[currentPeriod].profit = newPeriods[currentPeriod].price * (sellValue - buyValue) - 
                                        holdingCost * newPeriods[currentPeriod].stock
    } else {
      newPeriods[currentPeriod].stock = newPeriods[currentPeriod-1].stock + buyValue - sellValue
      newPeriods[currentPeriod].profit = newPeriods[currentPeriod].price * (sellValue - buyValue) - 
                                        holdingCost * newPeriods[currentPeriod].stock
    }
    
    // Update subsequent periods
    for (let i = currentPeriod + 1; i < newPeriods.length; i++) {
      newPeriods[i].stock = newPeriods[i-1].stock + newPeriods[i].buy - newPeriods[i].sell
      newPeriods[i].profit = newPeriods[i].price * (newPeriods[i].sell - newPeriods[i].buy) - 
                             holdingCost * newPeriods[i].stock
    }
    
    setPeriods(newPeriods)
  }, [periods, currentPeriod, buyInput, sellInput, holdingCost])

  const nextPeriod = useCallback(() => {
    // Apply current changes before moving to next period
    applyChanges()
    
    if (currentPeriod < periods.length - 1) {
      setCurrentPeriod(currentPeriod + 1)
    } else {
      setIsComplete(true)
    }
  }, [currentPeriod, periods.length, applyChanges])

  const resetGame = useCallback(() => {
    setPeriods([
      { price: 10, buy: 0, sell: 0, stock: 0, profit: 0 },
      { price: 15, buy: 0, sell: 0, stock: 0, profit: 0 },
      { price: 12, buy: 0, sell: 0, stock: 0, profit: 0 },
    ])
    setCurrentPeriod(0)
    setIsComplete(false)
    setIsValid(null)
    setBuyInput("0")
    setSellInput("0")
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Warehouse className="h-5 w-5" />
          Warehousing Problem Interactive
        </CardTitle>
        <CardDescription>
          Optimize warehouse operations by buying and selling stock to maximize profit
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showInstructions && (
          <div className="bg-muted p-4 rounded-lg mb-4">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              How to Play
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li><strong>Understand the problem:</strong> You manage a warehouse with capacity {capacity} units and holding cost ${holdingCost} per unit per period.</li>
              <li><strong>Make decisions:</strong> For each period, decide how much to buy and sell based on the price.</li>
              <li><strong>Constraints:</strong> Stock cannot be negative or exceed capacity. Final stock must be zero.</li>
              <li><strong>Goal:</strong> Maximize total profit across all periods.</li>
              <li><strong>Progress:</strong> Use the "Next Period" button to move through time periods.</li>
              <li><strong>Reset:</strong> Click "Reset" to start over.</li>
            </ol>
            <div className="mt-3 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowInstructions(false)}>
                Got it
              </Button>
            </div>
          </div>
        )}

        {/* Game Status */}
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">
            Period: {currentPeriod + 1} of {periods.length}
          </div>
          <div className="text-sm font-medium">
            Total Profit: ${totalProfit.toFixed(2)}
          </div>
        </div>

        {/* Current Period */}
        <div className="border rounded-lg p-4 bg-muted">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium">Period {currentPeriod + 1}</div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="text-lg font-medium">Price: ${periods[currentPeriod].price}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Buy Amount</span>
                <span className="text-sm font-medium">{buyInput} units</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max={capacity}
                  value={buyInput}
                  onChange={handleBuyChange}
                  className="w-full"
                />
                <div className="flex items-center gap-1 text-sm text-red-500 whitespace-nowrap">
                  <TrendingDown className="h-4 w-4" />
                  <span>Cost: ${(parseInt(buyInput) || 0) * periods[currentPeriod].price}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Sell Amount</span>
                <span className="text-sm font-medium">{sellInput} units</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max={capacity}
                  value={sellInput}
                  onChange={handleSellChange}
                  className="w-full"
                />
                <div className="flex items-center gap-1 text-sm text-green-500 whitespace-nowrap">
                  <TrendingUp className="h-4 w-4" />
                  <span>Revenue: ${(parseInt(sellInput) || 0) * periods[currentPeriod].price}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-2 rounded border">
              <div className="text-sm font-medium">Current Stock</div>
              <div className="text-lg">{periods[currentPeriod].stock} units</div>
            </div>
            <div className="bg-white p-2 rounded border">
              <div className="text-sm font-medium">Period Profit</div>
              <div className={`text-lg ${periods[currentPeriod].profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${periods[currentPeriod].profit.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Period Summary */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Period</th>
                <th className="py-2 text-right">Price</th>
                <th className="py-2 text-right">Buy</th>
                <th className="py-2 text-right">Sell</th>
                <th className="py-2 text-right">Stock</th>
                <th className="py-2 text-right">Profit</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((period, index) => (
                <tr key={index} className={`border-b ${index === currentPeriod ? 'bg-muted' : ''}`}>
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2 text-right">${period.price}</td>
                  <td className="py-2 text-right">{period.buy}</td>
                  <td className="py-2 text-right">{period.sell}</td>
                  <td className="py-2 text-right">{period.stock}</td>
                  <td className={`py-2 text-right ${period.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${period.profit.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button onClick={resetGame} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="ghost" onClick={() => setShowInstructions(true)}>
              <HelpCircle className="h-4 w-4 mr-2" />
              Instructions
            </Button>
          </div>
          
          <div className="flex gap-2">
            {!isComplete ? (
              <Button onClick={nextPeriod}>
                Next Period
              </Button>
            ) : (
              <div className={`flex items-center gap-2 ${isValid ? 'text-green-500' : 'text-red-500'}`}>
                {isValid ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span>
                  {isValid
                    ? "Valid solution! Final stock is zero."
                    : "Invalid solution. Check constraints."}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 