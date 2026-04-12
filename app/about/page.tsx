'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Shield, Star, Briefcase, CheckCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AboutPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load content:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-xl">Ошибка загрузки данных</div>
      </div>
    );
  }

  return (
    <>
      <Section background="light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: 'О компании', href: '/about' }]} />
        </div>
        <SectionHeader title="О компании" centered />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">{content.about?.history || ''}</p>
            <p className="text-gray-600 mb-6 leading-relaxed">{content.about?.mission || ''}</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{content.about?.year || ''}</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{content.about?.serviceArea || ''}</span>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Сертификации и стандарты:</h4>
              <ul className="space-y-1">
                {content.about?.certifications?.map((cert: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {content.about?.stats?.map((stat: any, i: number) => (
                <div key={i} className="bg-blue-500/10 rounded-xl p-5 text-center border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/20 flex items-center justify-center shadow-lg">
              <span className="text-8xl">❄️</span>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white border border-gray-200 rounded-xl p-5 shadow-xl shadow-blue-500/10">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-500" />
                <div>
                  <div className="font-semibold text-gray-800">Гарантия</div>
                  <div className="text-sm text-gray-600">до 1 года на все работы</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="dark">
        <SectionHeader title="Наши ценности" subtitle="Принципы нашей работы" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.about?.values?.map((value: any, i: number) => (
            <Card key={value.id} hover className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <Star className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
              <p className="text-slate-300 leading-relaxed">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Сертификаты и лицензии" subtitle="Официальные документы" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.about?.certificates?.map((cert: any, i: number) => (
            <Card key={cert.id} hover className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{cert.name}</h4>
              <p className="text-blue-600 font-medium mb-2">{cert.number}</p>
              <p className="text-gray-600 text-sm">{cert.issuedBy}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="light">
        <SectionHeader title="Наша команда" subtitle="Профессионалы своего дела" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.about?.team?.map((member: any, i: number) => (
            <Card key={member.id} hover className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h4>
              <p className="text-blue-600 font-medium mb-2">{member.position}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.experience}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
