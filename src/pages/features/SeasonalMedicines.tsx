import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Search, Clock, Beaker } from 'lucide-react';
import React from 'react';

const crops = ['Rice', 'Wheat', 'Corn', 'Cotton', 'Sugarcane'];
const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

export default function SeasonalMedicines() {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [selectedSeason, setSelectedSeason] = useState('Spring');
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState<{ name: string; dosage: string; frequency: string; instructions: string; precautions: string; }[]>([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setMedicines([
        {
          name: "Sample Medicine 1",
          dosage: "2-3 ml per liter of water",
          frequency: "Every 15 days",
          instructions: "Apply early morning or late evening",
          precautions: "Wear protective gear during application",
        },
        {
          name: "Sample Medicine 2",
          dosage: "1-2 grams per liter",
          frequency: "Weekly",
          instructions: "Mix thoroughly before application",
          precautions: "Avoid application during rain",
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen mt-12">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=1920"
          alt="Seasonal Medicines"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-lg p-8 backdrop-blur-sm bg-opacity-90">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-white">Seasonal Medicines</h1>
          </div>

          <p className="text-gray-300 mb-8">
            Get personalized recommendations for seasonal plant protection measures and medicines.
            Our system provides detailed guidance on medicine selection, dosage, and application
            methods based on your crop type and current season.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Crop</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-green-500 focus:ring-green-500"
                >
                  {crops.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Season</label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-green-500 focus:ring-green-500"
                >
                  {seasons.map(season => <option key={season} value={season}>{season}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button type="submit" disabled={loading} className="px-6 py-3 bg-green-500 text-black rounded-full font-semibold hover:bg-green-600 transition-colors flex items-center gap-2">
                {loading ? 'Searching...' : <><span>Get Recommendations</span> <Search className="w-4 h-4" /></>}
              </button>
            </div>
          </form>

          {medicines.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">Recommended Medicines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {medicines.map((medicine, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <Beaker className="w-5 h-5 text-green-500" /> {medicine.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Clock className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-gray-400">Dosage</p>
                          <p className="text-white">{medicine.dosage}</p>
                        </div>
                      </div>
                      <p className="text-gray-400">Frequency</p>
                      <p className="text-white">{medicine.frequency}</p>
                      <p className="text-gray-400">Instructions</p>
                      <p className="text-white">{medicine.instructions}</p>
                      <p className="text-gray-400">Precautions</p>
                      <p className="text-white">{medicine.precautions}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
