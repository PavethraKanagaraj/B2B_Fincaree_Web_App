// Figma: E3iIKwdE2far5TdrPYla2z  node: 10480:39
// Page: Icon System (Collection: 8.Icon System)
// Library: lucide-react
//
// This file exposes:
//   Icon       — wrapper component applying size/weight tokens to any Lucide icon
//   IconSize   — size token map  (Icon/Size/XS–2XL)
//   IconWeight — weight token map (Icon/Weight/Regular|Bold)
//
// Color must be set via className using the fc-icon-* utility classes
// (Icon/Default/*, Icon/Brand/*, Icon/Feedback/*) defined in globals.css,
// or via Tailwind text-* utilities that reference semantic tokens.
// Never set color via a hardcoded hex prop.

import * as React from 'react'
import { type LucideIcon, type LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Size tokens — Icon/Size/* ─────────────────────────────────────────────────

/**
 * Pixel values for each Icon/Size/* token from the 8.Icon System collection.
 *
 * | Token          | px | Use                               |
 * | -------------- | --:| --------------------------------- |
 * | Icon/Size/XS   | 12 | Very compact UI, badges           |
 * | Icon/Size/SM   | 16 | Dense UI, table actions           |
 * | Icon/Size/MD   | 20 | Default UI icon                   |
 * | Icon/Size/LG   | 24 | Buttons, navigation               |
 * | Icon/Size/XL   | 32 | Feature / empty-state icons       |
 * | Icon/Size/2XL  | 40 | Large illustrations, hero states  |
 */
export const IconSize = {
  xs:   12,
  sm:   16,
  md:   20,
  lg:   24,
  xl:   32,
  '2xl': 40,
} as const satisfies Record<string, number>

export type IconSizeToken = keyof typeof IconSize

// ── Weight tokens — Icon/Weight/* ─────────────────────────────────────────────

/**
 * strokeWidth values for each Icon/Weight/* token.
 *
 * | Token                | value | Use                      |
 * | -------------------- | ----: | ------------------------ |
 * | Icon/Weight/Regular  |   1.5 | Default stroke width     |
 * | Icon/Weight/Bold     |   2.0 | Emphasized stroke width  |
 */
export const IconWeight = {
  regular: 1.5,
  bold:    2.0,
} as const satisfies Record<string, number>

export type IconWeightToken = keyof typeof IconWeight

// ── Icon component ─────────────────────────────────────────────────────────

export interface IconProps extends Omit<LucideProps, 'size' | 'strokeWidth'> {
  /** The Lucide icon component to render (e.g. `ArrowRight`, `Check`) */
  icon: LucideIcon
  /**
   * Icon/Size/* token or an explicit pixel number.
   * @default 'md' (20px)
   */
  size?: IconSizeToken | number
  /**
   * Icon/Weight/* token or an explicit strokeWidth number.
   * @default 'regular' (1.5)
   */
  weight?: IconWeightToken | number
  /** Additional className — use fc-icon-* utilities for semantic color */
  className?: string
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    { icon: LucideIconComponent, size = 'md', weight = 'regular', className, ...props },
    ref
  ) => {
    const px = typeof size   === 'number' ? size   : IconSize[size]
    const sw = typeof weight === 'number' ? weight : IconWeight[weight]

    return (
      <LucideIconComponent
        ref={ref}
        size={px}
        strokeWidth={sw}
        className={cn(className)}
        {...props}
      />
    )
  }
)

Icon.displayName = 'Icon'

// ── Re-export lucide-react for convenience ────────────────────────────────────
// Consumers can import both the Icon wrapper and the specific icon in one line:
//   import { Icon, ArrowRight } from '@/components/fincaree/icon'
export {
  // Arrows & navigation
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowUpLeft,
  ArrowDownRight,
  ArrowDownLeft,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,

  // Actions
  Plus,
  Minus,
  X,
  Check,
  Search,
  Filter,
  SlidersHorizontal,
  RefreshCw,
  RotateCcw,
  Download,
  Upload,
  Share2,
  Copy,
  Clipboard,
  Edit2,
  Edit3,
  Pencil,
  Trash2,
  Trash,
  Save,
  Send,

  // UI controls
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Settings,
  Settings2,
  Sliders,
  MoreHorizontal,
  MoreVertical,
  Menu,
  Grid,
  List,
  LayoutGrid,
  Columns,
  Rows2,

  // Feedback / status
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bell,
  BellOff,
  BellRing,

  // Communication
  Mail,
  MessageSquare,
  MessageCircle,
  Phone,
  PhoneCall,
  Video,
  VideoOff,

  // Users
  User,
  Users,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,

  // Files & documents
  File,
  FileText,
  FilePlus,
  FileMinus,
  FileCheck,
  FileX,
  Folder,
  FolderOpen,
  FolderPlus,

  // Finance
  DollarSign,
  CreditCard,
  Wallet,
  TrendingUp,
  TrendingDown,
  BarChart,
  BarChart2,
  BarChart3,
  LineChart,
  PieChart,
  Receipt,

  // Time
  Clock,
  Calendar,
  CalendarDays,
  CalendarCheck,
  Timer,

  // Media
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Image,
  ImageOff,

  // Misc
  Link,
  Link2,
  ExternalLink,
  Globe,
  Map,
  MapPin,
  Building,
  Building2,
  Home,
  Star,
  Heart,
  Bookmark,
  Tag,
  Hash,
  At,
  Zap,
  Shield,
  ShieldCheck,
  Key,
  LogIn,
  LogOut,
  Package,
  Box,
  Layers,
  Database,
  Server,
  Cloud,
  CloudUpload,
  CloudDownload,
  Wifi,
  WifiOff,
} from 'lucide-react'
