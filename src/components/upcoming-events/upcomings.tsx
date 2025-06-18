'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import { Link, useTransitionRouter } from 'next-view-transitions';

import { BettingDrawer, sampleBetMarket } from '@/components/betting-drawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface UpcomingEvent {
  id: number;
  title: string;
  description: string;
  sport: string;
  date: string;
  time: string;
  venue: string;
  participants: string[];
  popularity: number;
  category: 'Championship' | 'League' | 'Tournament' | 'Exhibition';
  status: 'upcoming' | 'live' | 'completed';
  featured?: boolean;
  imageUrl?: string;
}

// Mock data for upcoming events
const mockEvents: UpcomingEvent[] = [
  {
    id: 1,
    title: 'NBA Finals Game 7',
    description: 'Championship deciding game between top teams',
    sport: 'Basketball',
    date: '2025-06-20',
    time: '20:00',
    venue: 'Madison Square Garden',
    participants: ['Lakers', 'Celtics'],
    popularity: 98,
    category: 'Championship',
    status: 'upcoming',
    featured: true,
  },
  {
    id: 2,
    title: 'Wimbledon Final',
    description: "Men's singles championship final",
    sport: 'Tennis',
    date: '2025-07-14',
    time: '14:00',
    venue: 'All England Club',
    participants: ['Novak Djokovic', 'Carlos Alcaraz'],
    popularity: 95,
    category: 'Championship',
    status: 'upcoming',
    featured: true,
  },
  {
    id: 3,
    title: 'Premier League Derby',
    description: 'Manchester United vs Manchester City',
    sport: 'Soccer',
    date: '2025-06-25',
    time: '17:30',
    venue: 'Old Trafford',
    participants: ['Manchester United', 'Manchester City'],
    popularity: 92,
    category: 'League',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'UFC 300 Main Event',
    description: 'Heavyweight championship bout',
    sport: 'MMA',
    date: '2025-07-04',
    time: '22:00',
    venue: 'T-Mobile Arena',
    participants: ['Jon Jones', 'Stipe Miocic'],
    popularity: 89,
    category: 'Championship',
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Masters Golf Tournament',
    description: 'Final round at Augusta National',
    sport: 'Golf',
    date: '2025-04-13',
    time: '14:00',
    venue: 'Augusta National',
    participants: ['Tiger Woods', 'Rory McIlroy', 'Jordan Spieth'],
    popularity: 85,
    category: 'Tournament',
    status: 'upcoming',
  },
  {
    id: 6,
    title: 'World Series Game 1',
    description: 'Baseball championship series opener',
    sport: 'Baseball',
    date: '2025-10-22',
    time: '20:00',
    venue: 'Yankee Stadium',
    participants: ['Yankees', 'Dodgers'],
    popularity: 88,
    category: 'Championship',
    status: 'upcoming',
  },
  {
    id: 7,
    title: 'Formula 1 Monaco GP',
    description: 'Monaco Grand Prix race',
    sport: 'Formula 1',
    date: '2025-05-25',
    time: '15:00',
    venue: 'Circuit de Monaco',
    participants: ['Max Verstappen', 'Lewis Hamilton', 'Charles Leclerc'],
    popularity: 91,
    category: 'Championship',
    status: 'upcoming',
  },
  {
    id: 8,
    title: 'NBA All-Star Skills Challenge',
    description: 'Annual skills competition showcase',
    sport: 'Basketball',
    date: '2025-02-16',
    time: '19:00',
    venue: 'Chase Center',
    participants: ['Stephen Curry', 'Damian Lillard', 'Trae Young'],
    popularity: 78,
    category: 'Exhibition',
    status: 'upcoming',
  },
];

export default function UpcomingEvents() {
  const { data: events = mockEvents, isLoading } = useQuery({
    queryKey: ['/api/events/upcoming'],
    queryFn: () => Promise.resolve(mockEvents),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const getTimeUntilEvent = (dateString: string, timeString: string) => {
    const eventDate = new Date(`${dateString}T${timeString}`);
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();

    if (diff < 0) return 'Started';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Championship':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'League':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Tournament':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Exhibition':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'text-red-600';
    if (popularity >= 80) return 'text-orange-600';
    if (popularity >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  // Group events by sport
  const eventsByCategory = events
    ? events.reduce(
        (acc, event) => {
          const category = event.sport;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(event);
          return acc;
        },
        {} as Record<string, UpcomingEvent[]>,
      )
    : {};

  // Sort categories by total popularity
  const categories = Object.keys(eventsByCategory).sort((a, b) => {
    const aPopularity = eventsByCategory[a].reduce(
      (sum, event) => sum + event.popularity,
      0,
    );
    const bPopularity = eventsByCategory[b].reduce(
      (sum, event) => sum + event.popularity,
      0,
    );
    return bPopularity - aPopularity;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="sticky top-0 z-10 bg-white shadow-sm dark:bg-gray-800">
          <div className="flex items-center px-4 py-4">
            <Skeleton className="mr-3 h-6 w-6" />
            <Skeleton className="h-6 w-36" />
          </div>
        </div>
        <div className="space-y-6 p-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="mb-3 h-6 w-24" />
              <div className="grid gap-4">
                {[1, 2].map((j) => (
                  <Skeleton key={j} className="h-32 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state when no events
  if (!events || events.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="sticky top-0 z-10 bg-white shadow-sm dark:bg-gray-800">
          <div className="flex items-center px-4 py-4">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft size={20} className="mr-3" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upcoming Events
            </h1>
          </div>
        </div>

        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
          <div className="max-w-sm text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <Calendar
                size={40}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              No Upcoming Events
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Stay tuned for exciting upcoming sports events and competitions!
            </p>
            <Link href="/">
              <Button className="hover:bg-primary/90 bg-primary text-white">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm dark:bg-gray-800">
        <div className="flex items-center px-4 py-4">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <ArrowLeft size={20} className="mr-3" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Upcoming Events
          </h1>
          <div className="ml-auto">
            <Badge className="bg-primary/10 border-primary/20 text-primary">
              {events.length} Events
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6 p-4">
        {categories.map((category) => {
          const categoryEvents = eventsByCategory[category].sort(
            (a, b) => b.popularity - a.popularity,
          );

          return (
            <div key={category}>
              <h2 className="mb-3 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                <Calendar size={20} className="mr-2 text-primary" />
                {category}
                <Badge className="ml-2 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  {categoryEvents.length}
                </Badge>
              </h2>

              <div className="grid gap-4">
                {categoryEvents.map((event) => (
                  <Card
                    key={event.id}
                    className={`touch-feedback cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      event.featured ? 'ring-primary/20 shadow-lg ring-2' : ''
                    }`}
                  >
                    {event.featured && (
                      <div className="from-primary/10 to-primary/5 absolute inset-0 animate-pulse rounded-lg bg-gradient-to-r" />
                    )}

                    <CardContent className="relative p-4">
                      {/* Header */}
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center space-x-2">
                            <Badge
                              className={`text-xs font-bold ${getCategoryColor(event.category)}`}
                            >
                              <Trophy size={10} className="mr-1" />
                              {event.category}
                            </Badge>
                            {event.featured && (
                              <Badge className="border-orange-200 bg-orange-100 text-xs text-orange-800">
                                <Star size={10} className="mr-1" />
                                Featured
                              </Badge>
                            )}
                            <div className="flex items-center text-xs">
                              <TrendingUp
                                size={10}
                                className={`mr-1 ${getPopularityColor(event.popularity)}`}
                              />
                              <span
                                className={`font-medium ${getPopularityColor(event.popularity)}`}
                              >
                                {event.popularity}% Popular
                              </span>
                            </div>
                          </div>
                          <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-white">
                            {event.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="mb-3 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-white/70 p-2 dark:bg-gray-800/50">
                          <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                            Date & Time
                          </div>
                          <div className="flex items-center text-sm font-bold text-gray-900 dark:text-white">
                            <Calendar className="mr-1 text-primary" size={12} />
                            {formatDate(event.date)}
                          </div>
                          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                            {event.time} •{' '}
                            {getTimeUntilEvent(event.date, event.time)}
                          </div>
                        </div>
                        <div className="rounded-lg bg-white/70 p-2 dark:bg-gray-800/50">
                          <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                            Venue
                          </div>
                          <div className="flex items-center text-sm font-bold text-gray-900 dark:text-white">
                            <MapPin className="mr-1 text-red-600" size={12} />
                            <span className="truncate">{event.venue}</span>
                          </div>
                        </div>
                      </div>

                      {/* Participants */}
                      <div className="mb-3">
                        <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                          Participants
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {event.participants.map((participant, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            >
                              {participant}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="mb-3 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Clock size={12} className="mr-1" />
                            {getTimeUntilEvent(event.date, event.time)}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Users size={12} className="mr-1" />
                            {event.participants.length} participants
                          </div>
                        </div>
                        <Badge
                          className={`text-xs ${
                            event.status === 'upcoming'
                              ? 'border-blue-200 bg-blue-100 text-blue-800'
                              : event.status === 'live'
                                ? 'border-red-200 bg-red-100 text-red-800'
                                : 'border-gray-200 bg-gray-100 text-gray-800'
                          }`}
                        >
                          {event.status === 'upcoming'
                            ? 'Upcoming'
                            : event.status === 'live'
                              ? 'Live'
                              : 'Completed'}
                        </Badge>
                      </div>

                      {/* Popularity Bar */}
                      <div className="mb-3">
                        <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="to-primary/80 h-1.5 rounded-full bg-gradient-to-r from-primary transition-all"
                            style={{
                              width: `${event.popularity}%`,
                            }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {event.popularity}% of users are interested
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="py-2 text-xs"
                        >
                          <Calendar size={12} className="mr-1" />
                          Add to Calendar
                        </Button>
                        <BettingDrawer
                          market={{
                            ...sampleBetMarket,
                            id: `market-${event.id}`,
                            title: `${event.title} Outcome`,
                            description: `Predict the outcome of ${event.title}`,
                            player: {
                              name: event.participants[0] || 'Event',
                              imageUrl: '/api/placeholder/64/64',
                              sport: event.sport,
                            },
                          }}
                          trigger={
                            <Button
                              size="sm"
                              className="hover:bg-primary/90 bg-primary py-2 text-xs text-white"
                            >
                              <Trophy size={12} className="mr-1" />
                              Place Bet
                            </Button>
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
