import React, { Dispatch, SetStateAction } from 'react'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { BaseText } from '../../../styles'

interface IProps {
  additionalInfo: IProduct | null
  isVisible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  background: rgba(24, 35, 61, 0.7);
  padding-horizontal: 40;
`
const Card = styled.View`
  background: white;
  padding-vertical: 8;
  padding-horizontal: 8;
  border-radius: 6px;
`
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  align-content: center;
`
const TitleText = styled(BaseText)`
  font-weight: 700;
`

export const ModalInfo: React.FC<IProps> = ({
  additionalInfo,
  isVisible,
  setVisible,
}) => (
  <Modal transparent={true} visible={isVisible}>
    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
      <ModalOverlay>
        <Card>
          <Row>
            <TitleText>Brand Name: </TitleText>
            <BaseText>{additionalInfo?.brand || ''}</BaseText>
          </Row>
          <Row>
            <TitleText>Price: </TitleText>
            <BaseText>{`${additionalInfo?.price || 0} $`}</BaseText>
          </Row>
          <Row>
            <TitleText>Rating: </TitleText>
            <BaseText>{additionalInfo?.rating || 0}</BaseText>
          </Row>
        </Card>
      </ModalOverlay>
    </TouchableWithoutFeedback>
  </Modal>
)
