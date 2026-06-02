'use client';

import { useState, useCallback } from 'react';

export function useAdminContent() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Load content error:', error);
      setMessage('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveContent = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (response.ok) {
        setMessage('Сохранено успешно!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Ошибка сохранения');
      }
    } catch (error) {
      console.error('Save content error:', error);
      setMessage('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (path: string, value: any) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  return {
    content,
    loading,
    saving,
    message,
    loadContent,
    saveContent,
    updateContent,
    setMessage,
  };
}
