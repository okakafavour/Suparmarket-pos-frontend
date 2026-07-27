import {
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

export default function SalesChartCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            Sales Overview
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Revenue Analytics
          </h2>
        </div>

        <button className="rounded-xl p-2 hover:bg-slate-100">
          <MoreHorizontal className="h-5 w-5" />
        </button>

      </div>

      <div className="flex items-end gap-3 h-64">

        {[45,80,55,95,65,120,90,140,100,170,130,180].map(
          (height,index)=>(
            <div
              key={index}
              className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-600 to-blue-300 transition-all duration-300 hover:scale-105"
              style={{height}}
            />
          )
        )}

      </div>

      <div className="mt-8 flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            Monthly Revenue
          </p>

          <h3 className="text-3xl font-bold">
            $24,580
          </h3>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">

          <TrendingUp className="h-4 w-4"/>

          <span className="font-semibold">
            +18%
          </span>

        </div>

      </div>

    </div>
  );
}