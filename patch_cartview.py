import sys

content = open('components/CartView.tsx').read()

# Quantity Minus button
content = content.replace(
    'className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-500 active:scale-90 transition-transform duration-100 border border-gray-100"',
    'className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-500 active:scale-90 transition-transform duration-100 border border-gray-100" aria-label={item.quantity === 1 ? "Remove item" : "Decrease quantity"}'
)

# Quantity Plus button
content = content.replace(
    'className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-[#34A853] active:scale-90 transition-transform duration-100 border border-gray-100"',
    'className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-[#34A853] active:scale-90 transition-transform duration-100 border border-gray-100" aria-label="Increase quantity"'
)

# Upsell Add button
content = content.replace(
    'className="w-full text-xs bg-[#EA4335] text-white font-bold px-3 py-2.5 rounded-xl shadow-lg shadow-red-200 hover:bg-[#d33426] active:scale-95 transition-all flex items-center justify-center gap-1.5"',
    'className="w-full text-xs bg-[#EA4335] text-white font-bold px-3 py-2.5 rounded-xl shadow-lg shadow-red-200 hover:bg-[#d33426] active:scale-95 transition-all flex items-center justify-center gap-1.5" aria-label={`Add ${item.name} to cart`}'
)

# Packaging options - this one is tricky because of the template literal
old_packaging = """                 <div
                  key={opt.id}
                  onClick={() => onSetPackaging(opt.id === 'std' ? null : opt)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    (selectedPackaging?.id === opt.id) || (opt.id === 'std' && !selectedPackaging)
                      ? 'border-indigo-500 bg-white shadow-md scale-[1.02]'
                      : 'border-transparent bg-white/40 hover:bg-white/80'
                  }`}
                 >"""

new_packaging = """                 <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSetPackaging(opt.id === 'std' ? null : opt)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between w-full text-left ${
                    (selectedPackaging?.id === opt.id) || (opt.id === 'std' && !selectedPackaging)
                      ? 'border-indigo-500 bg-white shadow-md scale-[1.02]'
                      : 'border-transparent bg-white/40 hover:bg-white/80'
                  }`}
                 >"""

content = content.replace(old_packaging, new_packaging)
content = content.replace('                 </div>\n               ))}', '                 </button>\n               ))}')

with open('components/CartView.tsx', 'w') as f:
    f.write(content)
