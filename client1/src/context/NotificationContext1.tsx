import React, { useState, createContext, useCallback, ReactNode } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface Notification {
  message: string;
  type: NotificationType;
  /* duration?: number; */
}

interface NotificationContextType {
  notification: Notification | null;
  showNotification: (message: string, type?: NotificationType, duration?: number) => void;
}

export const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode; }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      {notification && <NotificationComponent {...notification} />}
    </NotificationContext.Provider>
  );
};

interface NotificationProps {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

const NotificationComponent: React.FC<NotificationProps> = ({ message, type = 'info' }: NotificationProps) => {
  const colors = {
    success: '#54CF32',
    info: '#3283CF',
    warning: '#CF3A32',
    error: '#CF3A32',
  };
  const backgroundColor = colors[type] || 'info';
  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px', backgroundColor: backgroundColor }}>
      {message}
    </div>
  );
};
