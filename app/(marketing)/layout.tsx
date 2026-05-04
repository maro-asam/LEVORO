import LevoroFooter from "@/components/shared/Footer"
import LevoroHeader from "@/components/shared/Header"

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LevoroHeader />
      {children}
      <LevoroFooter />
    </div>
  )
}

export default MarketingLayout
