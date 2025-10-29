
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MarketplaceItem } from '../types';
import { FilterIcon, SearchIcon, PhoneIcon, LaptopIcon, CarIcon } from './icons/UiIcons';

const items: MarketplaceItem[] = [
    { id: 1, name: "هاتف ذكي", price: "150 د.ت", image: "phone" },
    { id: 2, name: "لابتوب", price: "800 د.ت", image: "laptop" },
    { id: 3, name: "سيارة", price: "15000 د.ت", image: "car" },
    { id: 4, name: "سماعات", price: "90 د.ت", image: "phone" },
];

const ItemIcon = ({iconName}: {iconName: string}) => {
    switch (iconName) {
        case 'phone': return <PhoneIcon className="w-24 h-24 text-gray-500"/>
        case 'laptop': return <LaptopIcon className="w-24 h-24 text-gray-500"/>
        case 'car': return <CarIcon className="w-24 h-24 text-gray-500"/>
        default: return <div className="w-24 h-24 bg-gray-700 rounded-lg"></div>;
    }
};


const MarketplaceScreen: React.FC = () => {
    const { t } = useLanguage();
  return (
    <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-6">{t('marketplace')}</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <input type="text" placeholder={t('searchMarketplace')} className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-2 ps-10 pe-4 text-white focus:outline-none focus:border-red-500"/>
                <SearchIcon className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400"/>
            </div>
            <button className="flex items-center justify-center gap-2 bg-gray-800 border-2 border-gray-700 rounded-lg py-2 px-4 text-white hover:bg-gray-700">
                <FilterIcon />
                <span>Filter</span>
            </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => (
                <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 h-40 flex items-center justify-center">
                        <ItemIcon iconName={item.image} />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <p className="text-red-500 font-bold">{item.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default MarketplaceScreen;
