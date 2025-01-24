'use client'

import React from 'react'
import { SalesTrend } from './SalesTrend';

export default function TransactionHeatmapPage() {

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">TRANSACTION HEATMAP</h3>
      </div>
      <SalesTrend/>
    
    </div>
  )
} 