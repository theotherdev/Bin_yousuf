// src/components/Amenities/AmenityIcons.tsx
import React from 'react';
import {
  Mountain,
  Waves,
  TreePine,
  Dumbbell,
  Car,
  Shield,
  Users,
  ShoppingBag,
  Gamepad2,
  Utensils,
  Camera,
  Home,
  MapPin,
  Zap,
  Wifi,
  Timer,
  Star,
  Briefcase,
  ShieldCheck,
  Building2,
  Bath,
  Palmtree,
  Coffee,
  Music,
  Cctv,
  Sparkles,
  Baby,
  Fuel,
  Bed,
  Sofa,
  Wrench,
  Wind,
  Lightbulb,
  Phone,
  Globe,
} from 'lucide-react';

interface IconProps {
  className?: string;
  size?: number;
}

// Panoramic Views Icon
export const PanoramicViewsIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Mountain className={className} size={size} />;

// Infinity Pool Icon
export const InfinityPoolIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Waves className={className} size={size} />;

// Limited Edition Penthouse Icon
export const PenthouseIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Star className={className} size={size} />;

// Waterfront Promenade Icon
export const WaterfrontPromenadeIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <TreePine className={className} size={size} />;

// Dedicated Car Parking Icon
export const CarParkingIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Car className={className} size={size} />;

// Sea Facing Apartments Icon
export const SeaFacingApartmentsIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Building2 className={className} size={size} />;

// Swimming Pool Icon (for regular pools)
export const SwimmingPoolIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Bath className={className} size={size} />;

// Private Beach Access Icon
export const PrivateBeachIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Palmtree className={className} size={size} />;

// Gated Community Icon
export const GatedCommunityIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <ShieldCheck className={className} size={size} />;

// Business Center Icon
export const BusinessCenterIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Briefcase className={className} size={size} />;

// Retail Outlets Icon
export const RetailOutletsIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <ShoppingBag className={className} size={size} />;

// Gym Icon
export const GymIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Dumbbell className={className} size={size} />;

// Kids Play Area Icon
export const KidsPlayAreaIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Baby className={className} size={size} />;

// Security Icon
export const SecurityIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Shield className={className} size={size} />;

// Community Center Icon
export const CommunityCenterIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Users className={className} size={size} />;

// Restaurants Icon
export const RestaurantsIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Utensils className={className} size={size} />;

// Entertainment Icon
export const EntertainmentIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Gamepad2 className={className} size={size} />;

// Smart Home Icon
export const SmartHomeIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Home className={className} size={size} />;

// Location Icon
export const LocationIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <MapPin className={className} size={size} />;

// Power Backup Icon
export const PowerBackupIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Zap className={className} size={size} />;

// WiFi Icon
export const WiFiIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Wifi className={className} size={size} />;

// 24/7 Services Icon
export const TwentyFourSevenIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Timer className={className} size={size} />;

// Premium Amenities Icon
export const PremiumAmenitiesIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Star className={className} size={size} />;

// Cafe Icon
export const CafeIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Coffee className={className} size={size} />;

// Music Room Icon
export const MusicRoomIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Music className={className} size={size} />;

// CCTV Security Icon
export const CCTVIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Cctv className={className} size={size} />;

// Luxury Features Icon
export const LuxuryFeaturesIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Sparkles className={className} size={size} />;

// Residents Lounge Icon
export const ResidentsLoungeIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Sofa className={className} size={size} />;

// Maintenance Icon
export const MaintenanceIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Wrench className={className} size={size} />;

// Air Conditioning Icon
export const AirConditioningIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Wind className={className} size={size} />;

// Electricity Icon
export const ElectricityIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Lightbulb className={className} size={size} />;

// Intercom Icon
export const IntercomIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Phone className={className} size={size} />;

// Internet Icon
export const InternetIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Globe className={className} size={size} />;

// Cinema Screen Icon
export const CinemaScreenIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Camera className={className} size={size} />;

// Generator Icon
export const GeneratorIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Fuel className={className} size={size} />;

// Bedrooms Icon
export const BedroomsIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <Bed className={className} size={size} />;

// Central Park Icon
export const CentralParkIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
  size = 32,
}) => <TreePine className={className} size={size} />;

// Icon mapping object for backwards compatibility
export const amenityIcons = {
  'panoramic-sea-views': PanoramicViewsIcon,
  'central-park': CentralParkIcon,
  'infinity-pool': InfinityPoolIcon,
  'swimming-pool': SwimmingPoolIcon,
  'private-beach': PrivateBeachIcon,
  'limited-penthouse': PenthouseIcon,
  penthouse: PenthouseIcon,
  'sea-facing-apartments': SeaFacingApartmentsIcon,
  'waterfront-promenade': WaterfrontPromenadeIcon,
  'car-parking': CarParkingIcon,
  'gated-community': GatedCommunityIcon,
  'business-center': BusinessCenterIcon,
  'retail-outlets': RetailOutletsIcon,
  gym: GymIcon,
  'kids-play-area': KidsPlayAreaIcon,
  security: SecurityIcon,
  'community-center': CommunityCenterIcon,
  restaurants: RestaurantsIcon,
  entertainment: EntertainmentIcon,
  'smart-home': SmartHomeIcon,
  location: LocationIcon,
  'power-backup': PowerBackupIcon,
  wifi: WiFiIcon,
  'twenty-four-seven': TwentyFourSevenIcon,
  'premium-amenities': PremiumAmenitiesIcon,
  cafe: CafeIcon,
  'music-room': MusicRoomIcon,
  cctv: CCTVIcon,
  'luxury-features': LuxuryFeaturesIcon,
  'residents-lounge': ResidentsLoungeIcon,
  maintenance: MaintenanceIcon,
  'air-conditioning': AirConditioningIcon,
  electricity: ElectricityIcon,
  intercom: IntercomIcon,
  internet: InternetIcon,
  'cinema-screen': CinemaScreenIcon,
  generator: GeneratorIcon,
  bedrooms: BedroomsIcon,
};
