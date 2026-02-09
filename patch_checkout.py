import sys

content = open('components/Checkout.tsx').read()

# Prepay Option
content = content.replace(
    '''            <div
              onClick={() => setMethod('prepay')}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all overflow-hidden ${
                method === 'prepay'
                  ? 'border-[#34A853] bg-green-50'
                  : 'border-gray-200 hover:border-green-200'
              }`}
            >''',
    '''            <button
              type="button"
              onClick={() => setMethod('prepay')}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all overflow-hidden text-left w-full ${
                method === 'prepay'
                  ? 'border-[#34A853] bg-green-50'
                  : 'border-gray-200 hover:border-green-200'
              }`}
            >'''
)

# COD Option
content = content.replace(
    '''            <div
              onClick={() => setMethod('cod')}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                method === 'cod'
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >''',
    '''            <button
              type="button"
              onClick={() => setMethod('cod')}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all text-left w-full ${
                method === 'cod'
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >'''
)

# Fix closing tags - be very careful here
content = content.replace(
    '''               </p>
            </div>''',
    '''               </p>
            </button>'''
)

with open('components/Checkout.tsx', 'w') as f:
    f.write(content)
