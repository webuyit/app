'use client';

import React, { useState } from 'react';

import { AlertCircle, CheckCircle, Lock, Shield, Sparkles } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { toast } from '@/hooks/use-toast';
import { socialLinks } from '@/lib/constants';

const AccessCodeEntry = () => {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessCode.trim() || accessCode.length < 6) {
      setError('Please enter a complete 6-digit access code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (
        accessCode.toLowerCase() === 'demo12' ||
        accessCode.toLowerCase() === 'welcom'
      ) {
        toast({
          title: 'Access Granted! 🎉',
          description: 'Welcome to Lovabler. Redirecting to your dashboard...',
        });
        console.log('Access granted for code:', accessCode);
      } else {
        setError('Invalid access code. Please check and try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleCodeChange = (value: string) => {
    setAccessCode(value);
    setError('');
  };

  const handleSocialClick = (href: string) => {
    if (href !== '#') {
      window.open(href, '_blank');
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-2">
      <div className="animate-fade-in mx-auto w-full max-w-md">
        <Card className="relative overflow-hidden border-0 bg-white/95 shadow-2xl backdrop-blur-sm">
          {/* Subtle background decoration */}
          <div className="bg-primary/5 absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full" />
          <div className="bg-primary/10 absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full" />

          <CardHeader className="relative z-10 space-y-6 pb-8 text-center">
            <div className="to-primary/90 mx-auto flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-primary shadow-lg">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-2">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-900">
                Welcome to GOATs
                <Sparkles className="text-brand-lime h-6 w-6 animate-pulse" />
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Enter your 6-digit access code to continue
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div className="text-center">
                  <label className="mb-4 block text-sm font-medium text-gray-700">
                    Access Code
                  </label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={accessCode}
                      onChange={handleCodeChange}
                      disabled={isLoading}
                      className="gap-2"
                    >
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot
                          index={0}
                          className={`h-14 w-14 rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                            error
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                              : 'focus:border-brand-lime focus:ring-brand-lime/30 focus:shadow-brand-lime/20 border-gray-200 focus:shadow-lg focus:ring-4'
                          } hover:border-brand-lime-light data-[has-value=true]:border-brand-lime data-[has-value=true]:bg-brand-lime/5 hover:shadow-md`}
                        />
                        <InputOTPSlot
                          index={1}
                          className={`h-14 w-14 rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                            error
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                              : 'focus:border-brand-lime focus:ring-brand-lime/30 focus:shadow-brand-lime/20 border-gray-200 focus:shadow-lg focus:ring-4'
                          } hover:border-brand-lime-light data-[has-value=true]:border-brand-lime data-[has-value=true]:bg-brand-lime/5 hover:shadow-md`}
                        />
                        <InputOTPSlot
                          index={2}
                          className={`h-14 w-14 rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                            error
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                              : 'focus:border-brand-lime focus:ring-brand-lime/30 focus:shadow-brand-lime/20 border-gray-200 focus:shadow-lg focus:ring-4'
                          } hover:border-brand-lime-light data-[has-value=true]:border-brand-lime data-[has-value=true]:bg-brand-lime/5 hover:shadow-md`}
                        />
                        <InputOTPSlot
                          index={3}
                          className={`h-14 w-14 rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                            error
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                              : 'focus:border-brand-lime focus:ring-brand-lime/30 focus:shadow-brand-lime/20 border-gray-200 focus:shadow-lg focus:ring-4'
                          } hover:border-brand-lime-light data-[has-value=true]:border-brand-lime data-[has-value=true]:bg-brand-lime/5 hover:shadow-md`}
                        />
                        <InputOTPSlot
                          index={4}
                          className={`h-14 w-14 rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                            error
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                              : 'focus:border-brand-lime focus:ring-brand-lime/30 focus:shadow-brand-lime/20 border-gray-200 focus:shadow-lg focus:ring-4'
                          } hover:border-brand-lime-light data-[has-value=true]:border-brand-lime data-[has-value=true]:bg-brand-lime/5 hover:shadow-md`}
                        />
                        <InputOTPSlot
                          index={5}
                          className={`h-14 w-14 rounded-xl border-2 text-xl font-bold transition-all duration-300 ${
                            error
                              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                              : 'focus:border-brand-lime focus:ring-brand-lime/30 focus:shadow-brand-lime/20 border-gray-200 focus:shadow-lg focus:ring-4'
                          } hover:border-brand-lime-light data-[has-value=true]:border-brand-lime data-[has-value=true]:bg-brand-lime/5 hover:shadow-md`}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Code is case-sensitive</span>
                </div>
              </div>

              {error && (
                <Alert className="animate-scale-in border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading || accessCode.length < 6}
                className="hover:from-brand-lime-dark hover:to-brand-lime h-14 w-full transform rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-md"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="border-3 h-6 w-6 animate-spin rounded-full border-white/30 border-t-white" />
                    Verifying Access...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6" />
                    Enter GOATs Arena
                  </div>
                )}
              </Button>
            </form>

            <div className="space-y-6 border-t border-gray-100 pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have a code?{' '}
                  <button
                    onClick={() =>
                      toast({
                        title: 'Support Team',
                        description:
                          'Our VIP support team will assist you shortly.',
                      })
                    }
                    className="text-brand-lime hover:text-brand-lime-dark font-medium underline underline-offset-2 transition-colors duration-200 hover:underline-offset-4"
                  >
                    Join our discord
                  </button>
                </p>
              </div>

              <div className="from-brand-lime/10 via-brand-lime/5 to-brand-lime/10 border-brand-lime/20 hidden rounded-xl border bg-gradient-to-r p-4">
                <p className="text-center text-xs leading-relaxed text-gray-600">
                  🎯 <strong>Demo codes:</strong> Try{' '}
                  <span className="text-brand-lime-dark rounded border bg-white px-2 py-1 font-mono font-semibold">
                    demo123
                  </span>{' '}
                  or{' '}
                  <span className="text-brand-lime-dark rounded border bg-white px-2 py-1 font-mono font-semibold">
                    welcome
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessCodeEntry;
