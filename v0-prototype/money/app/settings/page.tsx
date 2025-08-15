"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  UserCircle2,
  Smile,
  ShoppingCart,
  PiggyBank,
  HandHeart,
  Edit3,
  Trash2,
  Plus,
  DollarSign,
  UserIcon,
  ChevronDown,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface User {
  id: string
  name: string
  type: "ADULT" | "CHILD"
}

interface Bucket {
  id: string
  name: string
  icon: string
  assignedChildren: string[] // Many-to-many relationship
}

const mockUsers: User[] = [
  { id: "1", name: "Philip", type: "ADULT" },
  { id: "2", name: "Rachel", type: "ADULT" },
  { id: "3", name: "Max", type: "CHILD" },
  { id: "4", name: "Emma", type: "CHILD" },
]

const mockBuckets: Bucket[] = [
  { id: "1", name: "Spend", icon: "ShoppingCart", assignedChildren: ["3", "4"] },
  { id: "2", name: "Save", icon: "PiggyBank", assignedChildren: ["3", "4"] },
  { id: "3", name: "Give", icon: "HandHeart", assignedChildren: ["3"] },
  { id: "4", name: "College Fund", icon: "PiggyBank", assignedChildren: ["4"] },
]

export default function SettingsPage() {
  const router = useRouter()
  const [selectedChildId, setSelectedChildId] = useState<string>("")

  const handleSwitchProfile = () => {
    router.push("/")
  }

  const handleEditProfile = (userId: string) => {
    console.log("Edit profile:", userId)
  }

  const handleDeleteProfile = (userId: string) => {
    console.log("Delete profile:", userId)
  }

  const handleAddProfile = () => {
    console.log("Add new profile")
  }

  const handleEditBucket = (bucketId: string) => {
    console.log("Edit bucket:", bucketId)
  }

  const handleDeleteBucket = (bucketId: string) => {
    console.log("Delete bucket:", bucketId)
  }

  const handleAddBucket = () => {
    console.log("Add new bucket for child:", selectedChildId)
  }

  const getUserIcon = (user: User) => {
    if (user.type === "ADULT") {
      return <UserCircle2 size={24} className="text-primary-green" />
    } else {
      return <Smile size={24} className="text-primary-green" />
    }
  }

  const getBucketIcon = (iconName: string) => {
    switch (iconName) {
      case "ShoppingCart":
        return <ShoppingCart size={24} className="text-primary-green" />
      case "PiggyBank":
        return <PiggyBank size={24} className="text-primary-green" />
      case "HandHeart":
        return <HandHeart size={24} className="text-primary-green" />
      default:
        return <ShoppingCart size={24} className="text-primary-green" />
    }
  }

  const childUsers = mockUsers.filter((user) => user.type === "CHILD")
  const selectedChildBuckets = selectedChildId
    ? mockBuckets.filter((bucket) => bucket.assignedChildren.includes(selectedChildId))
    : []

  return (
    <div className="min-h-screen bg-background-beige">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
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
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOut size={16} className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-main-text mb-2 font-sans">Family Settings</h1>
          <p className="text-lg text-muted-text font-serif">Manage your family profiles and money buckets</p>
        </div>

        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardContent className="p-8">
            <Tabs defaultValue="profiles" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                <TabsTrigger value="profiles" className="font-serif text-base">
                  Profiles
                </TabsTrigger>
                <TabsTrigger value="buckets" className="font-serif text-base">
                  Buckets
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profiles" className="space-y-8">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-2xl font-semibold text-main-text font-sans">User Profiles</h2>
                    <p className="text-muted-text font-serif mt-1">Manage family member accounts</p>
                  </div>
                  <Button
                    onClick={handleAddProfile}
                    className="bg-primary-green hover:bg-primary-green/90 text-white font-serif px-6 py-2"
                  >
                    <Plus size={18} className="mr-2" />
                    Add New Profile
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        {getUserIcon(user)}
                        <div>
                          <h3 className="font-semibold text-main-text font-serif text-lg">{user.name}</h3>
                          <p className="text-sm text-muted-text font-serif capitalize">{user.type.toLowerCase()}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProfile(user.id)}
                          className="font-serif px-4"
                        >
                          <Edit3 size={16} className="mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProfile(user.id)}
                          className="bg-danger-red hover:bg-danger-red/90 font-serif px-4"
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="buckets" className="space-y-8">
                <div className="pb-4 border-b border-gray-100">
                  <h2 className="text-2xl font-semibold text-main-text mb-4 font-sans">Manage Buckets</h2>
                  <p className="text-muted-text font-serif mb-6">Buckets can be assigned to multiple children</p>

                  <div className="max-w-xs">
                    <label className="block text-sm font-medium text-main-text mb-3 font-serif">Select Child</label>
                    <Select value={selectedChildId} onValueChange={setSelectedChildId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a child" />
                      </SelectTrigger>
                      <SelectContent>
                        {childUsers.map((child) => (
                          <SelectItem key={child.id} value={child.id}>
                            {child.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedChildId && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-main-text font-sans">
                          {childUsers.find((child) => child.id === selectedChildId)?.name}'s Buckets
                        </h3>
                        <p className="text-muted-text font-serif mt-1">
                          {selectedChildBuckets.length} bucket{selectedChildBuckets.length !== 1 ? "s" : ""} assigned
                        </p>
                      </div>
                      <Button
                        onClick={handleAddBucket}
                        className="bg-primary-green hover:bg-primary-green/90 text-white font-serif px-6 py-2"
                      >
                        <Plus size={18} className="mr-2" />
                        Add New Bucket
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {selectedChildBuckets.map((bucket) => (
                        <div
                          key={bucket.id}
                          className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            {getBucketIcon(bucket.icon)}
                            <div>
                              <h4 className="font-semibold text-main-text font-serif text-lg">{bucket.name}</h4>
                              <p className="text-sm text-muted-text font-serif">
                                Shared with {bucket.assignedChildren.length} child
                                {bucket.assignedChildren.length !== 1 ? "ren" : ""}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditBucket(bucket.id)}
                              className="font-serif px-4"
                            >
                              <Edit3 size={16} className="mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteBucket(bucket.id)}
                              className="bg-danger-red hover:bg-danger-red/90 font-serif px-4"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
