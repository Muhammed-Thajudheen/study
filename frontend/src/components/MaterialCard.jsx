import Link from 'next/link'
import { DocumentTextIcon, VideoCameraIcon, SpeakerWaveIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline'

const iconMap = {
  PDF: DocumentTextIcon,
  VIDEO: VideoCameraIcon,
  AUDIO: SpeakerWaveIcon,
  DOC: DocumentTextIcon,
  PPT: PresentationChartBarIcon,
}

export default function MaterialCard({ material }) {
  const IconComponent = iconMap[material.material_type] || DocumentTextIcon
  
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-start mb-3">
        <div className="p-2 bg-blue-100 rounded-lg mr-3">
          <IconComponent className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold line-clamp-2">{material.title}</h3>
          <p className="text-sm text-gray-600">{material.course_name}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">
        {material.description || 'No description available'}
      </p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">
          {new Date(material.upload_date).toLocaleDateString()}
        </span>
        <span className="flex items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {material.download_count}
        </span>
      </div>
      <Link
        href={`/materials/${material.id}`}
        className="mt-4 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        
          View Details
        
      </Link>
    </div>
  );
}