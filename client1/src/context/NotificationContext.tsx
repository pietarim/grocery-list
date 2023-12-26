import { useContext, createContext, useState, ReactNode } from 'react';
import { Card, CardBody, Text } from '@chakra-ui/react';

interface ContextNotification {
  message: string;
  type: 'success' | 'info' | 'warning';
}

type NotificationOptions = 'success' | 'info' | 'warning';

interface NotificationContextType {
  notification: ContextNotification | null;
  showNotification: (message: string, type: 'success' | 'info' | 'warning') => void;
}

const defaultNotificationContext: NotificationContextType = {
  notification: null,
  showNotification: (message: string, type: NotificationOptions) => {
    // Default implementation or no-op
  }
};

export const NotificationContext = createContext<NotificationContextType | null>(defaultNotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode; }) => {
  const [notification, setNotification] = useState<ContextNotification | null>(null);

  const showNotification = (message: string, type: NotificationOptions) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  /* if (!notification) {
    return null;
  } */

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      {notification && <NotificationComponent {...notification} />}
    </NotificationContext.Provider>
  );
};

interface NotificationProps {
  message: string;
  type: 'success' | 'info' | 'warning';
}

const NotificationComponent = ({ message, type }: NotificationProps) => {

  const colors = {
    success: '#54CF32',
    info: '#3283CF',
    warning: '#CF3A32',
  };
  const backgroundColor = colors[type] || 'info';

  console.log('message', message);
  return (
    <Card style={{ backgroundColor: backgroundColor, zIndex: '4', position: 'fixed', bottom: '10px' }}>
      <CardBody>
        <Text>{message}</Text>
      </CardBody>
    </Card>
  );
};

export const useNotification = () => {
  const notification = useContext(NotificationContext);
  return notification;
};