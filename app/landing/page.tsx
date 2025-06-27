"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight, CheckCircle, FileText, Shield, Users} from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-theme-content">
            {/* Header */}
            <header className="bg-theme-primary-700 shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/ward-logo.svg"
                            alt="लेखापढी Logo"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <h1 className="text-2xl font-bold text-theme-light">लेखापढी</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/api/auth/signin"
                            className="px-4 py-2 rounded-md bg-theme-primary-600 hover:bg-theme-primary-700 text-theme-light transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 md:py-24 bg-theme-primary-700 text-theme-light">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Create and Sign Official Nepali Documents
                            Online</h1>
                        <p className="text-xl mb-8 opacity-90">
                            लेखापढी helps you draft legal documents and get them signed by the appropriate authorities
                            efficiently and securely.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/api/auth/signin"
                                className="px-6 py-3 rounded-md bg-theme-light text-theme-primary-700 hover:bg-theme-gray-100 font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                Get Started <ArrowRight className="w-4 h-4"/>
                            </Link>
                            <Link
                                href="#features"
                                className="px-6 py-3 rounded-md bg-transparent border border-theme-light text-theme-light hover:bg-theme-primary-600 flex items-center justify-center gap-2 transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-theme-content">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose लेखापढी?</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-theme-card p-6 rounded-lg shadow-md">
                            <div
                                className="w-12 h-12 bg-theme-card border border-theme-primary-300 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6 text-theme-primary-600"/>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Easy Document Creation</h3>
                            <p className="text-theme-foreground opacity-80">
                                Create official Nepali documents with our intuitive templates and user-friendly
                                interface.
                            </p>
                        </div>

                        <div className="bg-theme-card p-6 rounded-lg shadow-md">
                            <div
                                className="w-12 h-12 bg-theme-card border border-theme-primary-300 rounded-full flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-theme-primary-600"/>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Secure Signatures</h3>
                            <p className="text-theme-foreground opacity-80">
                                Get your documents signed securely by authorized officials with our verified signature
                                system.
                            </p>
                        </div>

                        <div className="bg-theme-card p-6 rounded-lg shadow-md">
                            <div
                                className="w-12 h-12 bg-theme-card border border-theme-primary-300 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-theme-primary-600"/>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Streamlined Workflow</h3>
                            <p className="text-theme-foreground opacity-80">
                                Simplify the document approval process with our efficient workflow management system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-theme-content">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>

                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-start gap-4 mb-6">
                            <CheckCircle className="w-6 h-6 text-theme-success-600 flex-shrink-0 mt-1"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Save Time and Resources</h3>
                                <p className="text-theme-foreground opacity-80">
                                    Eliminate the need for physical visits to government offices by creating and
                                    processing documents online.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 mb-6">
                            <CheckCircle className="w-6 h-6 text-theme-success-600 flex-shrink-0 mt-1"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Reduce Errors</h3>
                                <p className="text-theme-foreground opacity-80">
                                    Our templates ensure that all required information is included, reducing errors and
                                    rejection rates.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 mb-6">
                            <CheckCircle className="w-6 h-6 text-theme-success-600 flex-shrink-0 mt-1"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                                <p className="text-theme-foreground opacity-80">
                                    Monitor the status of your documents in real-time, from submission to approval.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <CheckCircle className="w-6 h-6 text-theme-success-600 flex-shrink-0 mt-1"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
                                <p className="text-theme-foreground opacity-80">
                                    All your documents are securely stored and easily accessible whenever you need them.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-theme-primary-700 text-theme-light">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Simplify Your Document Process?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Join लेखापढी today and experience a more efficient way to create and process official Nepali
                        documents.
                    </p>
                    <Link
                        href="/api/auth/signin"
                        className="px-8 py-3 rounded-md bg-theme-light text-theme-primary-700 hover:bg-theme-gray-100 font-medium inline-flex items-center gap-2 transition-colors"
                    >
                        Get Started Now <ArrowRight className="w-4 h-4"/>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-theme-gray-800 text-theme-light py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <Image
                                src="/ward-logo.svg"
                                alt="लेखापढी Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                            <span className="text-xl font-semibold">लेखापढी</span>
                        </div>
                        <div className="text-sm opacity-80">
                            &copy; {new Date().getFullYear()} लेखापढी. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
