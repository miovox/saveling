"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Plus,
  ShoppingCart,
  PiggyBank,
  HandHeart,
  Edit3,
  Smile,
  UserIcon,
  Settings,
  LogOut,
  ChevronDown,
  DollarSign,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { NewTransactionModal } from "@/components/new-transaction-modal"
import { useState } from "react"

// Data interfaces as specified
interface Child {
  id: string
  name: string
}

interface Bucket {
  id: string
  name: string
  balance: number
}

interface Transaction {
  id: string
  childName: string
  bucketName: string
  description: string
  date: string
  amount: number
  type: "DEPOSIT" | "WITHDRAWAL"
}

// Mock data for children and their buckets
const mockChildren: (Child & { buckets: Bucket[] })[] = [
  {
    id: "3",
    name: "Max",
    buckets: [
      { id: "1", name: "Spend", balance: 45.5 },
      { id: "2", name: "Save", balance: 125.75 },
      { id: "3", name: "Give", balance: 20.0 },
    ],
  },
]

const mockTransactions: Transaction[] = [
  {
    id: "1",
    childName: "Max",
    bucketName: "Spend",
    description: "Weekly Allowance",
    date: "2023-10-20",
    amount: 3.5,
    type: "DEPOSIT",
  },
  {
    id: "2",
    childName: "Max",
    bucketName: "Save",
    description: "Weekly Allowance",
    date: "2023-10-20",
    amount: 1.0,
    type: "DEPOSIT",
  },
  {
    id: "3",
    childName: "Max",
    bucketName: "Give",
    description: "Weekly Allowance",
    date: "2023-10-20",
    amount: 0.5,
    type: "DEPOSIT",
  },
  {
    id: "4",
    childName: "Max",
    bucketName: "Spend",
    description: "Book Store",
    date: "2023-10-17",
    amount: -12.5,
    type: "WITHDRAWAL",
  },
  {
    id: "5",
    childName: "Max",
    bucketName: "Spend",
    description: "Ice Cream",
    date: "2023-10-14",
    amount: -4.75,
    type: "WITHDRAWAL",
  },
  {
    id: "6",
    childName: "Max",
    bucketName: "Save",
    description: "Birthday Money from Grandma",
    date: "2023-10-09",
    amount: 50.0,
    type: "DEPOSIT",
  },
]

// Currency formatting function
const formatCurrency = (amount: number): string => {
  return `$${Math.abs(amount).toFixed(2)}`
}

// Date formatting function
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  })
}

const getBucketIcon = (bucketName: string) => {
  switch (bucketName.toLowerCase()) {
    case "spend":
      return <ShoppingCart size={16} className="text-main-text" /> // Updated icon
    case "save":
      return <PiggyBank size={16} className="text-main-text" />
    case "give":
      return <HandHeart size={16} className="text-main-text" /> // Updated icon
    default:
      return <ShoppingCart size={16} className="text-main-text" />
  }
}

const getBucketIconLarge = (bucketName: string) => {
  switch (bucketName.toLowerCase()) {
    case "spend":
      return <ShoppingCart size={24} className="text-primary-green" /> // Updated icon
    case "save":
      return <PiggyBank size={24} className="text-primary-green" />
    case "give":
      return <HandHeart size={24} className="text-primary-green" /> // Updated icon
    default:
      return <ShoppingCart size={24} className="text-primary-green" />
  }
}

const calculateFamilyTotal = (): number => {
  return mockChildren.reduce((total, child) => {
    return total + child.buckets.reduce((childTotal, bucket) => childTotal + bucket.balance, 0)
  }, 0)
}

export default function DashboardPage() {
  const router = useRouter()
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)

  const handleNewTransaction = () => {
    setIsTransactionModalOpen(true)
  }

  const handleEditTransaction = (transactionId: string) => {
    console.log("Edit transaction:", transactionId)
  }

  const handleSwitchProfile = () => {
    router.push("/")
  }

  const familyTotal = calculateFamilyTotal()

  return (
    <div className="min-h-screen bg-background-beige">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-green rounded-full">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-main-text font-sans">MoolahVault</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100">
                <UserIcon size={20} className="text-main-text" />
                <ChevronDown size={16} className="text-main-text" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleSwitchProfile} className="cursor-pointer">
                <UserIcon size={16} className="mr-2" />
                Switch Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
                {" "}
                <Settings size={16} className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOut size={16} className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-main-text mb-2 font-sans">Welcome, Philip!</h1>
            <p className="text-muted-text font-serif">Here's your family's financial overview.</p>
          </div>

          <Card className="bg-white border border-gray-200 shadow-sm mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 bg-main-text rounded flex items-center justify-center">
                  <span className="text-white text-xs">$</span>
                </div>
                <h2 className="text-lg font-semibold text-main-text font-sans">Family Total Balance</h2>
              </div>
              <p className="text-sm text-muted-text mb-4 font-serif">
                The combined total of all your children's buckets.
              </p>
              <div className="text-4xl font-bold text-primary-green font-sans">${familyTotal.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-main-text font-sans">Children's Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockChildren.map((child) => (
                  <div key={child.id} className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                      <div className="w-10 h-10 bg-primary-green/10 rounded-full flex items-center justify-center">
                        <Smile size={20} className="text-primary-green" />
                      </div>
                      <h3 className="text-xl font-semibold text-main-text font-sans">{child.name}</h3>
                      <div className="ml-auto text-lg font-bold text-main-text font-sans">
                        ${child.buckets.reduce((total, bucket) => total + bucket.balance, 0).toFixed(2)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {child.buckets.map((bucket) => (
                        <div key={bucket.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="p-3 bg-primary-green/10 rounded-full">{getBucketIconLarge(bucket.name)}</div>
                          <div>
                            <h4 className="font-semibold text-main-text font-serif">{bucket.name}</h4>
                            <p className="text-2xl font-bold text-main-text font-sans">${bucket.balance.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl text-main-text font-sans">Recent Family Transactions</CardTitle>
                <p className="text-sm text-muted-text mt-1 font-serif">
                  A log of all recent activity across all children's accounts.
                </p>
              </div>
              <Button
                onClick={handleNewTransaction}
                className="bg-primary-green hover:bg-primary-green/90 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 font-serif"
              >
                <Plus size={16} />
                Add Transaction
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4 pb-3 border-b border-gray-200 text-sm font-medium text-muted-text font-serif">
                <div>Child</div>
                <div>Bucket</div>
                <div>Description</div>
                <div>Date</div>
                <div>Amount</div>
                <div>Actions</div>
              </div>

              <div className="space-y-0">
                {mockTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="grid grid-cols-6 gap-4 py-3 border-b border-gray-100 last:border-b-0 items-center"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary-green/10 rounded-full flex items-center justify-center">
                        <Smile size={12} className="text-primary-green" />
                      </div>
                      <span className="font-medium text-main-text font-serif">{transaction.childName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getBucketIcon(transaction.bucketName)}
                      <span className="text-main-text font-serif">{transaction.bucketName}</span>
                    </div>

                    <div className="text-main-text font-serif">{transaction.description}</div>

                    <div className="text-muted-text font-serif">{formatDate(transaction.date)}</div>

                    <div
                      className={`font-semibold font-serif ${
                        transaction.type === "DEPOSIT" ? "text-success-green" : "text-danger-red"
                      }`}
                    >
                      {transaction.type === "DEPOSIT" ? "↗" : "↙"} {formatCurrency(transaction.amount)}
                    </div>

                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTransaction(transaction.id)}
                        className="text-muted-text hover:text-main-text"
                      >
                        <Edit3 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isTransactionModalOpen && (
        <NewTransactionModal open={isTransactionModalOpen} onOpenChange={setIsTransactionModalOpen} />
      )}
    </div>
  )
}
