import Link from 'next/link'
import { Download, FileText, FileSpreadsheet, FilePresentation, File } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Template } from '@/types/content'

const FILE_ICONS: Record<string, React.ReactNode> = {
  pdf:  <FileText className="w-6 h-6 text-red-500" />,
  xlsx: <FileSpreadsheet className="w-6 h-6 text-green-600" />,
  xls:  <FileSpreadsheet className="w-6 h-6 text-green-600" />,
  docx: <FileText className="w-6 h-6 text-blue-600" />,
  doc:  <FileText className="w-6 h-6 text-blue-600" />,
  pptx: <FilePresentation className="w-6 h-6 text-orange-500" />,
  ppt:  <FilePresentation className="w-6 h-6 text-orange-500" />,
}

function fileIcon(type?: string) {
  return FILE_ICONS[type?.toLowerCase() ?? ''] ?? <File className="w-6 h-6 text-kbo-gray" />
}

function formatSize(bytes?: number) {
  if (!bytes) return null
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface DownloadCardProps {
  template: Template
}

export default function DownloadCard({ template }: DownloadCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-kbo-gray-light rounded-xl flex items-center justify-center">
          {fileIcon(template.bestandstype)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            <span className="badge-teal">Template</span>
            {template.themas?.slice(0, 1).map((t) => (
              <span key={t._id} className="badge-blue">{t.title}</span>
            ))}
          </div>
          <Link href={`/tooling/${template.slug}`}>
            <h3 className="font-semibold text-kbo-blue hover:text-kbo-teal transition-colors mb-1 text-balance">
              {template.titel}
            </h3>
          </Link>
          <p className="text-sm text-kbo-gray line-clamp-2 mb-3">{template.samenvatting}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-kbo-gray mb-3">
            <span>Bijgewerkt: {formatDate(template.bijgewerktOp)}</span>
            {template.bijlagen?.[0] && (
              <>
                <span className="uppercase font-medium text-kbo-gray">
                  {template.bijlagen[0].bestandstype}
                </span>
                {template.bijlagen[0].bestandsgrootte && (
                  <span>{formatSize(template.bijlagen[0].bestandsgrootte)}</span>
                )}
              </>
            )}
          </div>

          {template.bijlagen?.map((b) => (
            <a
              key={b._key}
              href={b.asset?.url ?? '#'}
              download
              className="inline-flex items-center gap-2 btn-primary text-xs py-1.5 px-3 mr-2 mb-2"
            >
              <Download className="w-3.5 h-3.5" />
              {b.titel}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
