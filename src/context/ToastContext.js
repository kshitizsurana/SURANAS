import React, { createContext, useContext, useState, useCallback } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const success = useCallback((message) => addToast(message, 'success'), [addToast]);
    const error = useCallback((message) => addToast(message, 'error'), [addToast]);
    const info = useCallback((message) => addToast(message, 'info'), [addToast]);

    const value = {
        success,
        error,
        info,
        addToast,
        removeToast
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-24 right-4 z-50 space-y-3 max-w-md">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};

const Toast = ({ toast, onClose }) => {
    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <FiCheckCircle className="text-green-500" size={20} />;
            case 'error':
                return <FiAlertCircle className="text-red-500" size={20} />;
            default:
                return <FiInfo className="text-blue-500" size={20} />;
        }
    };

    const getStyles = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-500/10 border-green-500/30 text-green-500';
            case 'error':
                return 'bg-red-500/10 border-red-500/30 text-red-500';
            default:
                return 'bg-blue-500/10 border-blue-500/30 text-blue-500';
        }
    };

    return (
        <div className={`flex items-center gap-3 p-4 rounded-lg border backdrop-blur-sm animate-slide-in ${getStyles()}`}>
            {getIcon()}
            <p className="flex-1 text-white">{toast.message}</p>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
            >
                <FiX size={18} />
            </button>
        </div>
    );
};

export default ToastProvider;
