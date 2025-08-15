"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface User {
  id: string
  name: string
}

interface Bucket {
  id: string
  name: string
}

interface NewTransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data for children and their buckets
const mockChildren: User[] = [
  { id: "1", name: "Max" },
  { id: "2", name: "Emma" },
  { id: "3", name: "Liam" },
]

const getBucketsForChild = (childId: string): Bucket[] => {
  // Different buckets for different children (as requested for prototype)
  switch (childId) {
    case "1": // Max
      return [
        { id: "1", name: "Spend" },
        { id: "2", name: "Save" },
        { id: "3", name: "Give" },
      ]
    case "2": // Emma
      return [
        { id: "4", name: "Spend" },
        { id: "5", name: "Save" },
        { id: "6", name: "Give" },
        { id: "7", name: "College Fund" },
      ]
    case "3": // Liam
      return [
        { id: "8", name: "Spend" },
        { id: "9", name: "Save" },
        { id: "10", name: "Give" },
        { id: "11", name: "Bike Fund" },
      ]
    default:
      return []
  }
}

export function NewTransactionModal({ open, onOpenChange }: NewTransactionModalProps) {
  const [transactionType, setTransactionType] = useState<string>("")
  const [selectedChild, setSelectedChild] = useState<string>("")
  const [selectedBucket, setSelectedBucket] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [date, setDate] = useState<Date>(new Date())
  const [note, setNote] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const availableBuckets = selectedChild ? getBucketsForChild(selectedChild) : []

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!transactionType) {
      newErrors.transactionType = "Transaction type is required"
    }
    if (!selectedChild) {
      newErrors.selectedChild = "Child selection is required"
    }
    if (!selectedBucket) {
      newErrors.selectedBucket = "Bucket selection is required"
    }
    if (!amount || Number.parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    const formData = {
      type: transactionType,
      childId: selectedChild,
      childName: mockChildren.find((child) => child.id === selectedChild)?.name,
      bucketId: selectedBucket,
      bucketName: availableBuckets.find((bucket) => bucket.id === selectedBucket)?.name,
      amount: Number.parseFloat(amount),
      date: date.toISOString(),
      note: note.trim() || undefined,
    }

    console.log("New Transaction Data:", formData)

    // Reset form and close modal
    handleCancel()
  }

  const handleCancel = () => {
    setTransactionType("")
    setSelectedChild("")
    setSelectedBucket("")
    setAmount("")
    setDate(new Date())
    setNote("")
    setErrors({})
    onOpenChange(false)
  }

  // Reset bucket selection when child changes
  const handleChildChange = (childId: string) => {
    setSelectedChild(childId)
    setSelectedBucket("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-main-text font-sans">New Transaction</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Transaction Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-main-text font-serif">Transaction Type *</Label>
            <RadioGroup value={transactionType} onValueChange={setTransactionType} className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deposit" id="deposit" />
                <Label htmlFor="deposit" className="font-serif text-main-text">
                  Deposit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="withdrawal" id="withdrawal" />
                <Label htmlFor="withdrawal" className="font-serif text-main-text">
                  Withdrawal
                </Label>
              </div>
            </RadioGroup>
            {errors.transactionType && <p className="text-sm text-danger-red font-serif">{errors.transactionType}</p>}
          </div>

          {/* Child Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-main-text font-serif">Child *</Label>
            <Select value={selectedChild} onValueChange={handleChildChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a child" />
              </SelectTrigger>
              <SelectContent>
                {mockChildren.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.selectedChild && <p className="text-sm text-danger-red font-serif">{errors.selectedChild}</p>}
          </div>

          {/* Bucket Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-main-text font-serif">Bucket *</Label>
            <Select value={selectedBucket} onValueChange={setSelectedBucket} disabled={!selectedChild}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a bucket" />
              </SelectTrigger>
              <SelectContent>
                {availableBuckets.map((bucket) => (
                  <SelectItem key={bucket.id} value={bucket.id}>
                    {bucket.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.selectedBucket && <p className="text-sm text-danger-red font-serif">{errors.selectedBucket}</p>}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-main-text font-serif">Amount *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-main-text font-serif">$</span>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="pl-8 font-serif"
              />
            </div>
            {errors.amount && <p className="text-sm text-danger-red font-serif">{errors.amount}</p>}
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-main-text font-serif">Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-serif bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-main-text font-serif">Note (Optional)</Label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about this transaction..."
              className="min-h-[80px] font-serif"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={handleCancel} className="flex-1 font-serif bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-primary-green hover:bg-primary-green/90 text-white font-serif"
          >
            Save Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
