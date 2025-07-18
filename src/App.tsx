import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { 
  Wallet, 
  Send, 
  QrCode, 
  History, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Bitcoin,
  Coins,
  TrendingUp
} from 'lucide-react'
import { blink } from './blink/client'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [walletConnected, setWalletConnected] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const connectWallet = async () => {
    // Simulate wallet connection
    setWalletConnected(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center crypto-glow">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-foreground">CryptoLink Pay</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    {user.email}
                  </Badge>
                  {!walletConnected ? (
                    <Button onClick={connectWallet} className="bg-primary hover:bg-primary/90">
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </Button>
                  ) : (
                    <Badge className="bg-accent text-accent-foreground">
                      <div className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></div>
                      Wallet Connected
                    </Badge>
                  )}
                </div>
              ) : (
                <Button onClick={() => blink.auth.login()} className="bg-primary hover:bg-primary/90">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {user ? (
        <Dashboard walletConnected={walletConnected} onConnectWallet={connectWallet} />
      ) : (
        <LandingPage />
      )}
    </div>
  )
}

function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm text-primary font-medium">Frictionless Crypto Payments</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              The Future of
              <span className="text-primary block">Digital Payments</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Send, receive, and manage cryptocurrency payments with zero friction. 
              Connect your wallet and start transacting in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
                onClick={() => blink.auth.login()}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-border hover:bg-card"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose CryptoLink Pay?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the modern crypto economy with enterprise-grade security and consumer-friendly design.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Instant Transfers</CardTitle>
                <CardDescription>
                  Send crypto payments instantly to anyone, anywhere in the world with minimal fees.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>QR Code Payments</CardTitle>
                <CardDescription>
                  Generate payment links and QR codes for seamless in-person and online transactions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your keys, your crypto. Non-custodial solution with enterprise-grade security.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Supported Cryptocurrencies */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Multi-Currency Support
            </h2>
            <p className="text-xl text-muted-foreground">
              Support for all major cryptocurrencies and tokens
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Bitcoin', symbol: 'BTC', icon: Bitcoin, color: 'text-orange-500' },
              { name: 'Ethereum', symbol: 'ETH', icon: Coins, color: 'text-blue-500' },
              { name: 'USDC', symbol: 'USDC', icon: Coins, color: 'text-green-500' },
              { name: 'More', symbol: '+50', icon: TrendingUp, color: 'text-primary' }
            ].map((crypto) => (
              <Card key={crypto.symbol} className="bg-card/30 border-border/50 text-center hover:bg-card/50 transition-colors">
                <CardContent className="p-6">
                  <crypto.icon className={`w-8 h-8 mx-auto mb-3 ${crypto.color}`} />
                  <h3 className="font-semibold text-foreground">{crypto.name}</h3>
                  <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users already using CryptoLink Pay for their crypto transactions.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            onClick={() => blink.auth.login()}
          >
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet & Start
          </Button>
        </div>
      </section>
    </>
  )
}

function Dashboard({ walletConnected, onConnectWallet }: { walletConnected: boolean, onConnectWallet: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!walletConnected ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Connect your crypto wallet to start sending and receiving payments instantly.
          </p>
          <Button onClick={onConnectWallet} size="lg" className="bg-primary hover:bg-primary/90">
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Balance Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">$12,450.32</div>
                <p className="text-sm text-muted-foreground">≈ 0.245 BTC</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">$12,450.32</div>
                <p className="text-sm text-accent">Ready to send</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">$0.00</div>
                <p className="text-sm text-muted-foreground">No pending transactions</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card/50 border-border/50 hover:bg-card/70 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Send Payment</CardTitle>
                <CardDescription>Send crypto to any wallet address</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/70 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Receive Payment</CardTitle>
                <CardDescription>Generate QR code or payment link</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/70 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <History className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View all your transactions</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest crypto transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No transactions yet</p>
                <p className="text-sm">Start by sending or receiving your first payment</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default App