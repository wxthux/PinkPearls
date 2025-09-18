import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle, HelpCircle } from "lucide-react"

export default async function SupportPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      details: "(94) 76 381-3687",
      availability: "Mon-Fri 8AM-8PM PST",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed help via email",
      details: "support@Pink Pearls.com",
      availability: "24/7 - Response within 2 hours",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help through our chatbot",
      details: "Click the chat button",
      availability: "24/7 Automated Support",
    },
  ]

  return (
    <main className="flex-1 py-12">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Support Center</h1>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            We're here to help! Get answers to your questions and support for your orders.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-red-300/10 rounded-lg flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-red-300" />
                </div>
                <CardTitle>{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">{method.details}</p>
                <p className="text-sm text-muted-foreground">{method.availability}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
            <CardHeader>
              <CardTitle>Visit Us At </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.6511672774121!2d80.05802029197964!3d6.71865563920231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24b300817f69f%3A0xe7966350f7e3992c!2sVICHITHRA%20SIR%20ENGLISH%20CLASSES!5e0!3m2!1sen!2slk!4v1749216204488!5m2!1sen!2slk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
            </CardContent>
          </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-red-300" />
                  Send us a Message
                </CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 2 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium mb-2">
                    Order Number (Optional)
                  </label>
                  <Input id="orderNumber" placeholder="#CC-12345" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Please describe your question or issue in detail..." rows={5} />
                </div>
                <Button className="w-full bg-red-300 hover:bg-rose-400">Send Message</Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Visit Our Facility</CardTitle>
                <CardDescription>Schedule a tour of our manufacturing facility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-red-300 mt-0.5" />
                  <div>
                    <p className="font-medium">Pink Pearls Manufacturing</p>
                    <p className="text-muted-foreground">
                      No: 888,
                      <br />
                      Panadura Road,
                      <br />
                      Horana, Sri Lanka.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-red-300" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 6:00 PM PST
                      <br />
                      Saturday: 9:00 AM - 4:00 PM PST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Schedule a Tour
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Quick Help?</CardTitle>
                <CardDescription>Use our floating chat assistant for instant support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <MessageCircle className="mx-auto h-16 w-16 text-red-300 mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Click the chat button in the bottom right corner to get instant answers to common questions.
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 bg-red-300 rounded-full animate-pulse"></div>
                    <span className="text-sm text-red-300 font-medium">Available 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
