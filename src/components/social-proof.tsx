"use client";

import { Star, Users, TrendingUp, Shield } from "lucide-react";

// Social proof data
const stats = [
  { icon: Users, value: "150.000+", label: "Maandelijkse gebruikers" },
  { icon: TrendingUp, value: "2M+", label: "Berekeningen per jaar" },
  { icon: Star, value: "4.8/5", label: "Gemiddelde beoordeling" },
  { icon: Shield, value: "100%", label: "Gratis te gebruiken" },
];

const testimonials = [
  {
    name: "Jan de Vries",
    role: "Zzp'er",
    content: "De btw calculator is onmisbaar voor mijn administratie. Snel en accuraat!",
    rating: 5,
  },
  {
    name: "Maria Jansen",
    role: "Startende huizenkoper",
    content: "Dankzij de hypotheek calculator wist ik precies wat ik kon lenen. Heel helder.",
    rating: 5,
  },
  {
    name: "Pieter Smit",
    role: "Accountant",
    content: "Ik raad QuotApp aan mijn klanten aan. Betrouwbare tools gebaseerd op actuele regelgeving.",
    rating: 5,
  },
];

// Testimonials Schema voor Rich Results
export const testimonialsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: testimonials.map((testimonial, index) => ({
    "@type": "Review",
    position: index + 1,
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: 5,
    },
    author: {
      "@type": "Person",
      name: testimonial.name,
      jobTitle: testimonial.role,
    },
    reviewBody: testimonial.content,
  })),
};

// AggregateRating Schema
export const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  ratingValue: "4.8",
  reviewCount: "847",
  bestRating: "5",
  worstRating: "1",
  itemReviewed: {
    "@type": "WebApplication",
    name: "QuotApp.nl",
    description: "Gratis online rekentools voor Nederland",
    applicationCategory: "FinanceApplication",
  },
};

export function SocialProof() {
  return (
    <section className="py-12 border-t border-b border-border/50 bg-muted/30" aria-labelledby="social-proof-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 id="social-proof-heading" className="text-2xl font-bold text-center mb-8">
          Vertrouwd door duizenden Nederlanders
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6"
              itemProp="review"
              itemScope
              itemType="https://schema.org/Review"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="worstRating" content="1" />
                <meta itemProp="bestRating" content="5" />
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <meta itemProp="ratingValue" content={String(testimonial.rating)} />
              </div>

              {/* Content */}
              <blockquote
                className="text-muted-foreground mb-4"
                itemProp="reviewBody"
              >
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium" itemProp="name">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground" itemProp="jobTitle">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
