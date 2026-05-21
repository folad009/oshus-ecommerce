"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">Get in Touch</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Your email address will not be published. Required fields are marked*
      </p>

      {submitted ? (
        <p className="text-sm text-forest font-medium">
          Thank you! Your message has been sent.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="contact-name"
              className="text-sm font-medium text-foreground mb-1.5 block"
            >
              Your Name <span className="text-coral">*</span>
            </label>
            <Input
              id="contact-name"
              name="name"
              required
              placeholder="Ex. John Doe"
              className="h-11 rounded-lg"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="text-sm font-medium text-foreground mb-1.5 block"
            >
              Email <span className="text-coral">*</span>
            </label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="example@gmail.com"
              className="h-11 rounded-lg"
            />
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="text-sm font-medium text-foreground mb-1.5 block"
            >
              Subject <span className="text-coral">*</span>
            </label>
            <Input
              id="contact-subject"
              name="subject"
              required
              placeholder="Enter Subject"
              className="h-11 rounded-lg"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="text-sm font-medium text-foreground mb-1.5 block"
            >
              Your Message <span className="text-coral">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Enter here.."
              className={cn(
                "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none",
                "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm resize-y"
              )}
            />
          </div>

          <Button
            type="submit"
            className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 px-8 text-sm font-semibold w-fit"
          >
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
}
