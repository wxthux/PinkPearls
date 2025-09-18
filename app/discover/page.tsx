import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Heart, Zap, Users, Award, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DiscoverPage() {
  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description:
        "We never compromise on quality. Every product goes through rigorous testing to ensure it meets our high standards.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing boundaries with cutting-edge printing technology and sustainable materials.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We listen, adapt, and deliver exactly what you need.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Award-winning designs and industry-leading production processes set us apart from the competition.",
    },
  ]

  const technologies = [
    {
      name: "Direct-to-Garment (DTG)",
      description: "High-resolution printing with vibrant colors that last",
      image: "/garment.jpg",
    },
    {
      name: "Screen Printing",
      description: "Durable prints perfect for bulk orders and simple designs",
      image: "/paint.jpg",
    },
    {
      name: "Heat Transfer",
      description: "Precise application for specialty materials and finishes",
      image: "/heat.jpg",
    },
    {
      name: "Embroidery",
      description: "Premium embroidered designs for a professional look",
      image: "/emb.jpg",
    },
  ]

  const celebrities = [
    {
      name: "Alex Rodriguez",
      role: "Former MLB Star",
      quote: "Elantré delivers quality that matches my standards.",
      image: "/avatar-1.png",
    },
    {
      name: "Sarah Chen",
      role: "Fashion Influencer",
      quote: "The attention to detail is incredible. My go-to for custom apparel.",
      image: "/avatar-6.png",
    },
    {
      name: "Marcus Johnson",
      role: "Fitness Coach",
      quote: "Comfortable, durable, and stylish. Perfect for my brand.",
      image: "/avatar-2.png",
    },
    {
      name: "Emma Thompson",
      role: "Startup Founder",
      quote: "Elantré helped bring our company merchandise to life.",
      image: "/avatar-11.png",
    },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-900/20 to-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover Our Story
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Crafting Quality
                <span className="text-orange-500"> Apparel</span>
                <br />
                Since 2015
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                From a small garage operation to an industry leader, we've been revolutionizing custom apparel printing
                with innovation, quality, and unmatched customer service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Watch Our Story
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero6.jpg"
                alt="Elantré Factory"
                width={800}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              To democratize custom apparel manufacturing, making high-quality, personalized clothing accessible to
              everyone, everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">State-of-the-Art Facility</h3>
              <p className="text-muted-foreground">
                Our 50,000 square foot facility houses the latest in printing technology, sustainable production
                processes, and quality control systems. Every piece of apparel is crafted with precision and care.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  ISO 9001 certified manufacturing processes
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  Eco-friendly water-based inks and sustainable materials
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  24/7 production capability with same-day turnaround
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  Advanced quality control and color matching systems
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/iso.png"
                alt="Factory Floor"
                width={300}
                height={200}
                className="rounded-lg"
              />
              <Image
                src="/eco.jpg"
                alt="Quality Control"
                width={300}
                height={200}
                className="rounded-lg"
              />
              <Image
                src="/24.jpg"
                alt="Printing Process"
                width={300}
                height={200}
                className="rounded-lg"
              />
              <Image
                src="/color.jpg"
                alt="Team at Work"
                width={300}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              The principles that guide everything we do, from design to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Technology Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Technology</h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Cutting-edge printing technologies that deliver exceptional results every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={tech.image || "/placeholder.svg"} alt={tech.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{tech.name}</CardTitle>
                  <CardDescription>{tech.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Celebrities Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              From athletes to influencers, see why top personalities choose Elantré for their apparel needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {celebrities.map((celebrity, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-20 h-20 relative mb-4">
                    <Image
                      src={celebrity.image || "/placeholder.svg"}
                      alt={celebrity.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{celebrity.name}</CardTitle>
                  <CardDescription>{celebrity.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">"{celebrity.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Create Something Amazing?</h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Join thousands of satisfied customers who trust Elantré for their custom apparel needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Start Your Order <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/support">
                <Button size="lg" variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
