import React from 'react';
import { 
  Plus, 
  Search, 
  Clock, 
  Star, 
  FileText, 
  ArrowUpRight,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  Microscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface BoardProps {
  onStartScan: () => void;
}

export function Board({ onStartScan }: BoardProps) {
  const recentStudies = [
    { id: 1, title: 'Molecular Biology Notes', date: '2 hours ago', icon: Microscope, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 2, title: 'Ancient History Timeline', date: 'Yesterday', icon: GraduationCap, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 3, title: 'Quantum Physics Intro', date: '3 days ago', icon: BrainCircuit, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-blue-600 p-8 lg:p-12 text-white">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Master your studies with AI assistance.
          </h1>
          <p className="text-blue-100 mb-8 text-lg">
            Scan your physical notes, textbooks, or research papers and let StudySync help you understand them better.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="secondary" onClick={onStartScan} className="bg-white text-blue-600 hover:bg-blue-50">
              <Plus className="w-5 h-5 mr-2" />
              New Scan
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              View All Projects
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <TrendingUp className="w-full h-full" />
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Recent & Stats */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
            </div>
            <div className="grid gap-4">
              {recentStudies.map((study) => (
                <Card key={study.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${study.bg} rounded-xl flex items-center justify-center`}>
                      <study.icon className={`w-6 h-6 ${study.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {study.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-3 h-3" />
                        {study.date}
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Learning Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Pages Scanned', value: '124', color: 'bg-green-500' },
                { label: 'Summaries Gen', value: '42', color: 'bg-blue-500' },
                { label: 'Hours Saved', value: '18h', color: 'bg-purple-500' },
              ].map((stat) => (
                <Card key={stat.label} className="p-4 flex flex-col items-center justify-center text-center">
                  <div className={`w-2 h-2 rounded-full ${stat.color} mb-2`} />
                  <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pinned & Tips */}
        <div className="space-y-8">
          <Card className="p-6 bg-slate-900 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <h3 className="font-bold">Pinned Research</h3>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer">
                <div className="flex items-center gap-2 text-xs text-blue-400 mb-1">
                  <FileText className="w-3 h-3" />
                  Thesis Outline
                </div>
                <p className="text-sm font-medium">Impact of AI on Early Education</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer">
                <div className="flex items-center gap-2 text-xs text-purple-400 mb-1">
                  <FileText className="w-3 h-3" />
                  Case Study
                </div>
                <p className="text-sm font-medium">Neuroscience of Habit Formation</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-4 text-white/60 hover:text-white hover:bg-white/5">
              Browse All
            </Button>
          </Card>

          <Card className="p-6 border-blue-100 bg-blue-50/50">
            <h3 className="font-bold text-slate-800 mb-2">Pro Tip</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              You can scan multi-page documents one by one and StudySync will combine them into a single study guide automatically.
            </p>
            <Button variant="link" className="p-0 h-auto text-blue-600 font-bold">
              Learn More →
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}