import React from "react";
import {
  ShoppingBag,
  Target,
  Eye,
  Truck,
  ShieldCheck,
  Headphones,
  Star,
} from "lucide-react";

const stats = [
  {
    title: "50K+",
    subtitle: "Happy Customers",
  },
  {
    title: "12K+",
    subtitle: "Products",
  },
  {
    title: "99%",
    subtitle: "Positive Reviews",
  },
  {
    title: "24/7",
    subtitle: "Customer Support",
  },
];

const features = [
  {
    icon: <Truck className="text-orange-500" size={34} />,
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping with real-time order tracking across multiple regions.",
  },
  {
    icon: <ShieldCheck className="text-orange-500" size={34} />,
    title: "Secure Payments",
    description:
      "Every payment is processed securely using trusted payment gateways.",
  },
  {
    icon: <Headphones className="text-orange-500" size={34} />,
    title: "24/7 Support",
    description:
      "Our support team is always available to help with your shopping experience.",
  },
  {
    icon: <Star className="text-orange-500" size={34} />,
    title: "Premium Quality",
    description:
      "We partner with trusted brands to deliver only high-quality products.",
  },
];

const team = [
  {
    name: "Alex Carter",
    role: "Founder & CEO",
    image: "https://i.pravatar.cc/300?img=11",
  },
  {
    name: "Sophia Miller",
    role: "Head of Operations",
    image: "https://i.pravatar.cc/300?img=32",
  },
  {
    name: "Daniel Wilson",
    role: "Lead Designer",
    image: "https://i.pravatar.cc/300?img=15",
  },
];

const About = () => {
  return (
    <section className="bg-[#0b0b0d] text-white">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-6 text-orange-500" size={55} />

          <h1 className="text-5xl font-bold">
            About <span className="text-orange-500">ShopNest</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            ShopNest is a modern e-commerce platform built to deliver an
            effortless shopping experience. Our mission is to connect customers
            with quality products through an elegant, secure, and intuitive
            online marketplace.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 md:p-14">
          <h2 className="mb-6 text-3xl font-bold">Our Story</h2>

          <p className="mb-5 leading-8 text-zinc-400">
            Founded with a passion for technology and customer satisfaction,
            ShopNest began as a small idea to simplify online shopping. Today,
            our platform demonstrates the architecture and features commonly
            found in modern e-commerce applications including authentication,
            product management, shopping cart functionality, secure payments,
            and order tracking.
          </p>

          <p className="leading-8 text-zinc-400">
            While this website serves as a demonstration project, it reflects
            real-world software engineering practices and scalable application
            design principles used in production-ready platforms.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10">
          <Target className="mb-4 text-orange-500" size={42} />

          <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>

          <p className="leading-8 text-zinc-400">
            To provide customers with a secure, seamless, and enjoyable online
            shopping experience while showcasing modern web technologies and
            scalable software architecture.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10">
          <Eye className="mb-4 text-orange-500" size={42} />

          <h2 className="mb-4 text-2xl font-semibold">Our Vision</h2>

          <p className="leading-8 text-zinc-400">
            To become a benchmark for innovative e-commerce experiences where
            design, performance, and reliability come together to delight users.
          </p>
        </div>
      </div>

      {/* Stats */}

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:border-orange-500"
          >
            <h3 className="text-4xl font-bold text-orange-500">{item.title}</h3>

            <p className="mt-3 text-zinc-400">{item.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}

      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Why Choose Us</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-orange-500"
            >
              <div className="mb-5">{feature.icon}</div>

              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>

              <p className="leading-8 text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}

      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Meet Our Team</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto mb-5 h-36 w-36 rounded-full object-cover"
              />

              <h3 className="text-2xl font-semibold">{member.name}</h3>

              <p className="mt-2 text-orange-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}

      <div className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-orange-500/20 bg-linear-to-r from-orange-500/10 to-zinc-900 p-12 text-center">
          <h2 className="text-4xl font-bold">Ready to Start Shopping?</h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
            Browse thousands of premium products and enjoy a modern shopping
            experience designed for speed, security, and convenience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
