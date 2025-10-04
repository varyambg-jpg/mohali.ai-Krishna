"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(e.target as HTMLFormElement),
      });

      if (res.ok) {
        setStatus(" Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus(" Failed to send message.");
      }
    } catch {
      setStatus(" Something went wrong.");
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-10">
      {/* Contact Form */}
      <div className="lg:col-span-2">
        <Card className="shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Send us a Message</CardTitle>
            <p className="text-gray-500">We’ll get back to you as soon as possible.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input name="firstName" placeholder="First Name *" required className="rounded-xl" />
                <Input name="lastName" placeholder="Last Name *" required className="rounded-xl" />
              </div>

              <Input name="email" type="email" placeholder="Email Address *" required className="rounded-xl" />
              <Input name="phone" type="tel" placeholder="Phone Number" className="rounded-xl" />

              <Select name="subject">
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select Subject *" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="business">Business Listing</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                name="message"
                placeholder="Your Message *"
                rows={6}
                required
                className="rounded-xl"
              />

              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
            {status && <p className="mt-4 text-center font-medium">{status}</p>}
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <Card className="shadow-md border border-gray-200">
          <CardContent className="flex items-start space-x-4 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-500">info@Mohali.ai</p>
              <p className="text-gray-500">support@Mohali.ai</p>
            </div>
          </CardContent>
        </Card>

        

        
      </div>
    </div>
  );
}
