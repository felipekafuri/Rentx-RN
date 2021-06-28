import SpeedSvg from '../assets/speed.svg'
import AccelerateSvg from '../assets/acceleration.svg'
import ForceSvg from '../assets/force.svg'
import EnergySvg from '../assets/energy.svg'
import GasolineSvg from '../assets/gasoline.svg'
import HybridSvg from '../assets/hybrid.svg'
import ExchangeSvg from '../assets/exchange.svg'
import PeopleSvg from '../assets/people.svg'
import CarSvg from '../assets/car.svg'

export function getAccessoryIcon(type: string) {
  switch (type) {
    case 'speed':
      return SpeedSvg
    case 'accelerate':
      return AccelerateSvg
    case 'turning_diameter':
      return ForceSvg
    case 'electric_motor':
      return EnergySvg
    case 'gasoline_motor':
      return GasolineSvg
    case 'hybrid_motor':
      return HybridSvg
    case 'exchange':
      return ExchangeSvg
    case 'seats':
      return PeopleSvg

    default:
      return CarSvg
  }
}
