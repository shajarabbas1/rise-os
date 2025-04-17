/* eslint-disable @typescript-eslint/no-explicit-any */
import AvailablePolicyModal from '@/components/shared/modals/AvailablePolicy.modal';
import PolicyAvailableFormModal from '@/components/shared/modals/PolicyAvailableForm.modal';
import Row from '@/components/shared/row';
import { CardDescription, CardHeading } from '@/components/shared/typography';
import { useCallback, useState } from 'react';

const AvailablePolicies = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showPolicyAndProcedure, setShowPolicyAndProcedure] =
    useState<boolean>(false);

  const [selectedPolicy, setSelectedPolicy] = useState<any>(false);
  const [selectedPolicyAndProcedure, setSelectedPolicyAndProcedure] =
    useState<any>(false);

  const toggleShowPolicyAndProcedure = useCallback((item: any) => {
    setShowPolicyAndProcedure(prev => !prev);
    setSelectedPolicyAndProcedure(item);
  }, []);

  const toggleShowForm = useCallback((item: any) => {
    setShowForm(prev => !prev);
    setSelectedPolicy(item);
  }, []);

  return (
    <Row className="w-full bg-white p-4 rounded-2xl gap-4 flex-col">
      <Row className="flex-col gap-2 mb-4">
        <CardHeading title="NDIS Compilance Packs" />
        <CardDescription title="Easy access all required policies, procedures and forms for each NDIS registration group." />
      </Row>

      {[
        { name: 'NDIS Verification Pack' },
        { name: 'NDIS Certification pack (Core Module)' },
        { name: 'NDIS Module 1: High Intensity' },
        { name: 'NDIS Module 2: Behaviour Support' },
        { name: 'NDIS Module 3: Early Child Support' },
        { name: 'NDIS Module 4: Support Coordinator' },
      ].map((item, index) => (
        <Row
          key={index}
          className="w-full p-4 justify-between items-center bg-orange-100 rounded-lg"
        >
          <CardHeading title={item.name} className='!text-[12px]' />

          <Row className="gap-6 items-center text-indigo-500 underline cursor-pointer">
            <CardDescription
              title="Policies & Procedures"
              onClick={() => toggleShowPolicyAndProcedure(item)}
              className='text-[14px]'
            />
            
            <CardDescription
              title="Forms"
              className='text-[14px]'
              onClick={() => toggleShowForm(item)}
            />
          </Row>
        </Row>
      ))}

      {showForm && (
        <PolicyAvailableFormModal
          onCancel={toggleShowForm}
          currentPolicy={selectedPolicy}
        />
      )}

      {showPolicyAndProcedure && (
        <AvailablePolicyModal
          currentPolicy={selectedPolicyAndProcedure}
          onCancel={toggleShowPolicyAndProcedure}
        />
      )}
    </Row>
  );
};

export default AvailablePolicies;
