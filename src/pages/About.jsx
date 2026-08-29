import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            About Our Store
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-300">
            We make online shopping simple, reliable, and enjoyable by
            bringing quality products to your doorstep.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Who We Are
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              Shopping made simple
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Our goal is to create a smooth and convenient shopping
              experience where customers can discover products, compare
              prices, manage their cart, and place orders with ease.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We focus on a clean user experience, reliable service, and
              making every step of the shopping journey straightforward.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">10K+</h3>
                <p className="mt-1 text-gray-500">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">500+</h3>
                <p className="mt-1 text-gray-500">Products</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
                <p className="mt-1 text-gray-500">Customer Support</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">100%</h3>
                <p className="mt-1 text-gray-500">Secure Shopping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Why Choose Us
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Everything you need for a better shopping experience
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Quality Products
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Discover products selected with quality and value in mind.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Easy Shopping
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Browse, search, add products to your cart, and checkout
                effortlessly.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Secure Checkout
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Your shopping experience is designed with security and
                convenience in mind.
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Customer Support
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                We're here to help whenever you need assistance with your
                orders or shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;