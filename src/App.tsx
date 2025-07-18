import React, { useState, useEffect } from 'react'
import { createClient } from '@blinkdotnew/sdk'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { 
  Plus, 
  Copy, 
  QrCode, 
  ExternalLink, 
  Bitcoin, 
  Wallet,
  Link,
  User,
  BarChart3,
  Trash2,
  Edit,
  Share2,
  Eye
} from 'lucide-react'

const blink = createClient({
  projectId: 'cryptolink-pay-mc9lool2',
  authRequired: false
})

interface CryptoAddress {
  id: string
  name: string
  symbol: string
  address: string
  network?: string
  icon: string
}

interface UserProfile {
  id: string
  username: string
  displayName: string
  bio: string
  avatar?: string
  theme: string
  addresses: CryptoAddress[]
  userId?: string
}

const CRYPTO_OPTIONS = [
  { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#F7931A' },
  { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627EEA' },
  { name: 'USD Coin', symbol: 'USDC', icon: '$', color: '#2775CA' },
  { name: 'Tether', symbol: 'USDT', icon: '₮', color: '#26A17B' },
  { name: 'Binance Coin', symbol: 'BNB', icon: 'B', color: '#F3BA2F' },
  { name: 'Cardano', symbol: 'ADA', icon: '₳', color: '#0033AD' },
  { name: 'Solana', symbol: 'SOL', icon: '◎', color: '#9945FF' },
  { name: 'Polygon', symbol: 'MATIC', icon: '⬟', color: '#8247E5' }
]

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'builder' | 'profile'>('landing')
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile>({
    id: '',
    username: '',
    displayName: '',
    bio: '',
    theme: 'dark',
    addresses: []
  })
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: '',
    symbol: '',
    address: '',
    network: '',
    icon: ''
  })

  // Demo profile for landing page
  const demoProfile: UserProfile = {
    id: 'demo',
    username: 'cryptodev',
    displayName: 'Alex Chen',
    bio: 'Crypto developer & DeFi enthusiast. Accept payments in multiple cryptocurrencies! 🚀',
    theme: 'dark',
    addresses: [
      { id: '1', name: 'Bitcoin', symbol: 'BTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', icon: '₿' },
      { id: '2', name: 'Ethereum', symbol: 'ETH', address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c', icon: 'Ξ' },
      { id: '3', name: 'USD Coin', symbol: 'USDC', address: '0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c', network: 'Ethereum', icon: '$' }
    ]
  }

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.symbol || !newAddress.address) return
    
    const address: CryptoAddress = {
      id: Date.now().toString(),
      name: newAddress.name,
      symbol: newAddress.symbol,
      address: newAddress.address,
      network: newAddress.network,
      icon: newAddress.icon || newAddress.symbol[0]
    }
    
    setProfile(prev => ({
      ...prev,
      addresses: [...prev.addresses, address]
    }))
    
    setNewAddress({ name: '', symbol: '', address: '', network: '', icon: '' })
    setIsAddingAddress(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add toast notification here
  }

  const removeAddress = (id: string) => {
    setProfile(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== id)
    }))
  }

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-background text-white">
        {/* Header */}
        <header className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Link className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CryptoLink Pay</span>
              </div>
              <div className="flex items-center space-x-4">
                {user ? (
                  <Button onClick={() => setCurrentView('builder')}>
                    My Profile
                  </Button>
                ) : (
                  <Button onClick={() => blink.auth.login()}>
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-6">
                  One Link for All Your
                  <span className="text-primary"> Crypto Payments</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Create a single shareable link showcasing all your cryptocurrency addresses. 
                  Like Linktree, but for crypto payments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => user ? setCurrentView('builder') : blink.auth.login()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Create Your Crypto Link
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setCurrentView('profile')}
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Demo Profile
                  </Button>
                </div>
              </div>

              {/* Demo Profile Preview */}
              <div className="lg:pl-8">
                <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                      AC
                    </div>
                    <h3 className="text-xl font-semibold">{demoProfile.displayName}</h3>
                    <p className="text-gray-400">@{demoProfile.username}</p>
                    <p className="text-sm text-gray-300 mt-2">{demoProfile.bio}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {demoProfile.addresses.map((addr) => (
                      <div key={addr.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                              {addr.icon}
                            </div>
                            <div>
                              <div className="font-medium">{addr.name}</div>
                              <div className="text-xs text-gray-400 font-mono">
                                {addr.address.slice(0, 8)}...{addr.address.slice(-6)}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <QrCode className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose CryptoLink Pay?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                The simplest way to share all your crypto payment methods in one place
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Link className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>One Link, All Cryptos</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Share a single link containing all your cryptocurrency addresses. No more copying multiple addresses.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>QR Codes Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Every address gets a QR code for easy mobile payments. Perfect for in-person transactions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                  </div>
                  <CardTitle>Track Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    See how many people visit your crypto link and which payment methods are most popular.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (currentView === 'profile') {
    const profileToShow = profile.addresses.length > 0 ? profile : demoProfile
    
    return (
      <div className="min-h-screen bg-background text-white">
        {/* Header */}
        <header className="border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView('landing')}
                className="text-gray-400 hover:text-white"
              >
                ← Back
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Profile */}
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                {profileToShow.displayName.split(' ').map(n => n[0]).join('')}
              </div>
              <h1 className="text-2xl font-bold">{profileToShow.displayName}</h1>
              <p className="text-gray-400">@{profileToShow.username}</p>
              <p className="text-gray-300 mt-3 text-sm leading-relaxed">{profileToShow.bio}</p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Accept Payments In:</h2>
              {profileToShow.addresses.map((addr) => (
                <div key={addr.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                        {addr.icon}
                      </div>
                      <div>
                        <div className="font-semibold">{addr.name}</div>
                        {addr.network && (
                          <div className="text-xs text-gray-400">{addr.network}</div>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      {addr.symbol}
                    </Badge>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-3 mb-3">
                    <div className="text-xs text-gray-400 mb-1">Address</div>
                    <div className="font-mono text-sm break-all">{addr.address}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => copyToClipboard(addr.address)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Address
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600">
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-gray-800">
              <p className="text-xs text-gray-500">
                Powered by <span className="text-primary">CryptoLink Pay</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Profile Builder
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Link className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">CryptoLink Pay</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentView('profile')}
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={() => setCurrentView('landing')}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Builder */}
          <div>
            <h1 className="text-3xl font-bold mb-8">Build Your Crypto Link</h1>
            
            {/* Profile Settings */}
            <Card className="bg-gray-900/50 border-gray-800 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="your-username"
                    value={profile.username}
                    onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                    className="bg-gray-800 border-gray-700"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Your link: cryptolink.pay/{profile.username || 'your-username'}
                  </p>
                </div>
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    placeholder="Your Name"
                    value={profile.displayName}
                    onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell people about yourself and what you accept crypto for..."
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Crypto Addresses */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    Crypto Addresses
                  </CardTitle>
                  <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Address
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-800">
                      <DialogHeader>
                        <DialogTitle>Add Crypto Address</DialogTitle>
                        <DialogDescription>
                          Add a cryptocurrency address that people can send payments to.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="crypto-name">Cryptocurrency</Label>
                            <select
                              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
                              value={newAddress.name}
                              onChange={(e) => {
                                const crypto = CRYPTO_OPTIONS.find(c => c.name === e.target.value)
                                if (crypto) {
                                  setNewAddress(prev => ({
                                    ...prev,
                                    name: crypto.name,
                                    symbol: crypto.symbol,
                                    icon: crypto.icon
                                  }))
                                }
                              }}
                            >
                              <option value="">Select cryptocurrency</option>
                              {CRYPTO_OPTIONS.map(crypto => (
                                <option key={crypto.symbol} value={crypto.name}>
                                  {crypto.name} ({crypto.symbol})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="network">Network (Optional)</Label>
                            <Input
                              id="network"
                              placeholder="e.g., Ethereum, BSC"
                              value={newAddress.network}
                              onChange={(e) => setNewAddress(prev => ({ ...prev, network: e.target.value }))}
                              className="bg-gray-800 border-gray-700"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="address">Wallet Address</Label>
                          <Input
                            id="address"
                            placeholder="Enter your wallet address"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                            className="bg-gray-800 border-gray-700 font-mono"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsAddingAddress(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddAddress}>
                            Add Address
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {profile.addresses.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No crypto addresses added yet.</p>
                    <p className="text-sm">Add your first address to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {profile.addresses.map((addr) => (
                      <div key={addr.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                              {addr.icon}
                            </div>
                            <div>
                              <div className="font-medium">{addr.name}</div>
                              <div className="text-xs text-gray-400 font-mono">
                                {addr.address.slice(0, 12)}...{addr.address.slice(-8)}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeAddress(addr.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-8">
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  {profile.displayName ? profile.displayName.split(' ').map(n => n[0]).join('') : '?'}
                </div>
                <h3 className="text-xl font-semibold">{profile.displayName || 'Your Name'}</h3>
                <p className="text-gray-400">@{profile.username || 'username'}</p>
                <p className="text-sm text-gray-300 mt-2">{profile.bio || 'Your bio will appear here...'}</p>
              </div>
              
              {profile.addresses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">Add crypto addresses to see them here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {profile.addresses.map((addr) => (
                    <div key={addr.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                            {addr.icon}
                          </div>
                          <div>
                            <div className="font-medium">{addr.name}</div>
                            <div className="text-xs text-gray-400 font-mono">
                              {addr.address.slice(0, 8)}...{addr.address.slice(-6)}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <QrCode className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App