import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from "../imports/svg-srbuh1jtmi";
import imgPill from "figma:asset/ac855bfe0b945cbda2cf87dc7b3575e007dfbcef.png";
import imgCutlery from "figma:asset/fb68421e766cb928dc981ce73d3e91bb409981f4.png";

interface HistoryItem {
  id: number;
  title: string;
  description: string;
  icon: 'pill' | 'cutlery';
  isPrescribed: boolean;
  fullDetails: string;
  prescriptionDetails?: string;
  category?: string;
}

const historyData: HistoryItem[] = [
  {
    id: 1,
    title: 'High Cholesterol',
    description: 'Prescribed atorvastatin.',
    icon: 'pill',
    isPrescribed: true,
    fullDetails: 'Atorvastatin is used along with a proper diet to help lower "bad" cholesterol and fats (such as LDL, triglycerides) and raise "good" cholesterol (HDL) in the blood. It belongs to a group of drugs known as "statins." It works by reducing the amount of cholesterol made by the liver.',
    prescriptionDetails: 'Prescription #: RX-2024-001234 | Refills: 3 remaining | Next refill: Mar 15, 2026',
    category: 'Cholesterol'
  },
  {
    id: 2,
    title: 'Dieting Tips',
    description: 'Focus on eating nutrient-dense foods.',
    icon: 'cutlery',
    isPrescribed: false,
    fullDetails: 'Focus on eating nutrient-dense foods such as leafy greens, lean proteins, whole grains, and healthy fats. Limit processed foods and added sugars. Aim for 5-7 servings of vegetables daily. Stay hydrated with at least 8 glasses of water.',
    category: 'Nutrition'
  },
  {
    id: 3,
    title: 'Acid Reflux',
    description: 'Prescribed Omeprazole.',
    icon: 'pill',
    isPrescribed: true,
    fullDetails: 'Omeprazole is used to treat certain stomach and esophagus problems (such as acid reflux, ulcers). It works by decreasing the amount of acid your stomach makes. It relieves symptoms such as heartburn, difficulty swallowing, and persistent cough.',
    prescriptionDetails: 'Prescription #: RX-2024-005678 | Refills: 5 remaining | Next refill: Apr 20, 2026',
    category: 'Digestive'
  }
];

interface NotificationCardProps {
  item: HistoryItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
  isPrescriptionExpanded: boolean;
  onTogglePrescription: () => void;
}

function NotificationCard({ item, isExpanded, onToggleExpand, isPrescriptionExpanded, onTogglePrescription }: NotificationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Extract medication name from title (e.g., "atorvastatin" from "Prescribed atorvastatin.")
  const medicationName = item.description.toLowerCase().includes('prescribed') 
    ? item.description.replace('Prescribed ', '').replace('.', '')
    : item.title;

  if (isExpanded) {
    // Expanded view matching the design
    return (
      <motion.div 
        className="relative bg-white rounded-lg p-[24px] w-full max-w-[352px] mx-auto cursor-default transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ 
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        }}
      >
        <div className="flex justify-between items-start mb-[16px]">
          <div className="flex-1">
            <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[28px] text-[#1e1e1e] leading-[1.2] mb-[4px] capitalize">
              {medicationName}
            </h2>
            {item.category && (
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[20px] text-[#1e1e1e] leading-[1.4]">
                {item.category}
              </p>
            )}
          </div>
          <motion.div 
            className="w-[48px] h-[48px] flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {item.icon === 'pill' ? (
              <img src={imgPill} alt="Medication" className="w-full h-full object-contain" />
            ) : (
              <img src={imgCutlery} alt="Diet" className="w-full h-full object-contain" />
            )}
          </motion.div>
        </div>

        <p className="font-['Inter:Regular',sans-serif] font-normal text-[18px] text-[#1e1e1e] leading-[1.6] mb-[24px]">
          {item.fullDetails}
        </p>

        {/* Expandable Prescription Details */}
        {item.prescriptionDetails && (
          <div 
            className="overflow-hidden transition-all duration-500 ease-in-out mb-[16px]"
            style={{
              maxHeight: isPrescriptionExpanded ? '500px' : '0px',
              opacity: isPrescriptionExpanded ? 1 : 0,
              transform: isPrescriptionExpanded ? 'translateY(0)' : 'translateY(-10px)',
              marginTop: isPrescriptionExpanded ? '0px' : '0px'
            }}
          >
            <div className="bg-[#c1fecc] bg-opacity-30 rounded-[8px] p-[12px] border border-[#38ea44] border-opacity-20">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[#1e1e1e] leading-[1.5]">
                {item.prescriptionDetails}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-[8px]">
          <motion.button
            onClick={onToggleExpand}
            className="bg-[#2c2c2c] hover:bg-[#1a1a1a] rounded-[8px] px-[16px] py-[12px] transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f5f5f5] text-[18px] leading-none">
              Read Less
            </p>
          </motion.button>

          {item.isPrescribed && (
            <motion.button
              onClick={onTogglePrescription}
              className="bg-[#c1fecc] hover:bg-[#aef7b9] rounded-[8px] px-[8px] py-[4px] flex items-center gap-[8px] transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg 
                className="shrink-0 size-[16px]" 
                fill="none" 
                viewBox="0 0 16 16"
                animate={{ rotate: isPrescriptionExpanded ? 360 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path d={svgPaths.p39be50} stroke="#38EA44" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
              </motion.svg>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#38ea44] text-[16px] leading-none whitespace-nowrap">
                Prescribed
              </p>
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  // Collapsed view
  return (
    <motion.div 
      className="relative bg-white rounded-lg p-[16px] w-full max-w-[352px] mx-auto cursor-default transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
      }}
    >
      <div className="flex gap-[12px]">
        {/* Left side - Icon */}
        <motion.div 
          className="w-[36px] h-[40px] flex items-center justify-center mt-[4px]"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {item.icon === 'pill' ? (
            <img src={imgPill} alt="Medication" className="w-full h-full object-contain" />
          ) : (
            <img src={imgCutlery} alt="Diet" className="w-full h-full object-contain" />
          )}
        </motion.div>

        {/* Middle - Content */}
        <div className="flex-1 flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#303030] leading-[1.4]">
              {item.title}
            </p>
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#1e1e1e] leading-[1.4]">
              {item.description}
            </p>
          </div>
          
          {/* Bottom row - Button and Badge aligned */}
          <div className="flex items-center justify-between gap-[8px]">
            <motion.button
              onClick={onToggleExpand}
              className="bg-[#2c2c2c] hover:bg-[#1a1a1a] rounded-[8px] px-[8px] py-[8px] transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#f5f5f5] text-[16px] leading-none">
                Read More
              </p>
            </motion.button>

            {item.isPrescribed && (
              <motion.button
                onClick={onTogglePrescription}
                className="bg-[#c1fecc] hover:bg-[#aef7b9] rounded-[8px] px-[8px] py-[4px] flex items-center gap-[8px] transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg 
                  className="shrink-0 size-[16px]" 
                  fill="none" 
                  viewBox="0 0 16 16"
                  animate={{ rotate: isPrescriptionExpanded ? 360 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d={svgPaths.p39be50} stroke="#38EA44" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
                </motion.svg>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#38ea44] text-[16px] leading-none whitespace-nowrap">
                  Prescribed
                </p>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [prescriptionExpandedCards, setPrescriptionExpandedCards] = useState<Set<number>>(new Set());

  const filteredData = historyData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCardExpansion = (id: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const togglePrescriptionExpansion = (id: number) => {
    setPrescriptionExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleBack = () => {
    alert('Navigating back...');
  };

  return (
    <div className="bg-[#e8f4f4] min-h-screen w-full flex flex-col">
      {/* Fixed Header */}
      <motion.div 
        className="bg-white h-[112px] relative sticky top-0 z-50 shadow-sm"
        initial={{ y: -112 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.button
          onClick={handleBack}
          className="absolute left-[16px] top-[36px] w-[40px] h-[40px] rounded-full flex items-center justify-center hover:bg-[#f0f0f0] transition-colors duration-200"
          aria-label="Go back"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 31 26">
            <path d={svgPaths.p352ba080} fill="#1D1B20" />
          </svg>
        </motion.button>
        
        <motion.h1 
          className="absolute left-1/2 -translate-x-1/2 top-[79px] font-['SF_Pro:Bold',sans-serif] font-bold text-[24px] text-black leading-[22px] text-center" 
          style={{ fontVariationSettings: "'wdth' 100" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          History
        </motion.h1>
      </motion.div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-[40px]">
        {/* Search Bar */}
        <motion.div 
          className="px-[24px] mt-[20px] mb-[24px] sticky top-0 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <motion.div 
            className="bg-white rounded-[28px] h-[56px] flex items-center px-[4px] max-w-[720px]"
            whileHover={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}
            transition={{ duration: 0.2 }}
          >
            <motion.button 
              className="flex items-center justify-center size-[48px] rounded-full transition-colors"
              whileHover={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg 
                className="size-[24px]" 
                fill="none" 
                viewBox="0 0 24 24"
                animate={{ rotate: searchQuery ? 0 : [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <path d={svgPaths.p32dc8f00} fill="#49454F" />
              </motion.svg>
            </motion.button>
            
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent px-[20px] font-['Roboto:Regular',sans-serif] text-[16px] text-[#49454f] tracking-[0.5px] outline-none"
              style={{ fontVariationSettings: "'wdth' 100" }}
            />
            
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  onClick={() => setSearchQuery('')}
                  className="flex items-center justify-center size-[48px] rounded-full transition-colors"
                  aria-label="Clear search"
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                  whileHover={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    scale: 1.1,
                    rotate: 90
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.pc423380} fill="#49454F" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Notifications List */}
        <motion.div 
          className="px-[24px] space-y-[16px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <NotificationCard
                    item={item}
                    isExpanded={expandedCards.has(item.id)}
                    onToggleExpand={() => toggleCardExpansion(item.id)}
                    isPrescriptionExpanded={prescriptionExpandedCards.has(item.id)}
                    onTogglePrescription={() => togglePrescriptionExpansion(item.id)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="text-center py-[40px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-['Inter:Regular',sans-serif] text-[16px] text-[#1e1e1e]">
                  No results found for "{searchQuery}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}