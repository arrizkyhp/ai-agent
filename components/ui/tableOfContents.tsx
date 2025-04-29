'use client';

import { useState } from 'react';

import { ChevronDown, LoaderCircle, Menu, MessagesSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface TableOfContentsProps {
  sections: {
    id: string
    title: string
    isCard: boolean
  }[]
  onNavigate: (id: string) => void
  isLoading?: boolean
}

const TableOfContents = ({ sections, onNavigate, isLoading = false }: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Toggle the table of contents
  const toggleTOC = () => {
    if (isLoading) {
      // If loading, prevent toggling and close the dropdown
      setIsOpen(false);

      return;
    }
    setIsOpen(!isOpen);
  };

  // Handle navigation to a section
  const handleNavigate = (id: string) => {
    onNavigate(id);
    setActiveSection(id);

    // On mobile, close the TOC after navigation
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{
        opacity: 0,
        x: 20,
      }}
        animate={{
        opacity: 1,
        x: 0,
      }}
        exit={{
        opacity: 0,
        x: 20,
      }}
        className="flex flex-col items-end fixed top-6 right-4 z-20"
      >
        {/* Toggle button */}
        <div className="flex gap-2">
          <button
            disabled={isLoading}
            className="flex items-center gap-2 bg-[#252422] text-[#FFFCF2] px-3 py-2 rounded-md text-sm font-medium mb-1 shadow-md"
          >

            <MessagesSquare className="h-4 w-4" />
            {/*<LoaderCircle className="animate-spin" />*/}
            <span className="hidden md:inline">View Last Message</span>

          </button>
          <button
            onClick={toggleTOC}
            disabled={isLoading}
            className="flex items-center gap-2 bg-[#252422] text-[#FFFCF2] px-3 py-2 rounded-md text-sm font-medium mb-1 shadow-md"
          >

            <Menu className="h-4 w-4" />
            {/*<LoaderCircle className="animate-spin" />*/}
            <span className="hidden md:inline">History</span>
            {isLoading && <LoaderCircle className="animate-spin h-4 w-4" />}
            {!isLoading && (<ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />)}

          </button>
        </div>

        {/* Table of contents */}
        {isOpen && !isLoading && (
        <div className="bg-[#252422] text-[#FFFCF2] rounded-md shadow-lg p-2 w-48 md:w-56 max-h-[70vh] overflow-y-auto">
          <div className="py-1 px-2 text-xs text-[#CCC5B9] uppercase font-medium">Navigation</div>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleNavigate(section.id)}
                  className={`w-full text-left px-2 py-1.5 text-sm rounded hover:bg-[#403D39] flex items-center ${
                    activeSection === section.id ? 'bg-[#403D39]/50' : ''
                  }`}
                >
                  <div className="flex items-center">
                    {activeSection === section.id && <div className="w-1 h-5 bg-[#EB5E28] rounded-full mr-2"></div>}
                    <span className={activeSection === section.id ? 'ml-0' : 'ml-3'}>{section.title}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      </motion.div>
    </AnimatePresence>

  );
};

export default TableOfContents;
