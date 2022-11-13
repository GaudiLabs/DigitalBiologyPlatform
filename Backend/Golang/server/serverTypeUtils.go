package server

import "github.com/DigitalBiologyPlatform/Backend/defines"

// GenerateMaskFrame returns an imaginary frame containing all the proctols used in the passed protocol param
func (uploadProtocolParams *UploadProtocolParams) GenerateMeta() (maskFrame defines.Frame, fullDuration int, framesAmount int) {
	var returnedElectrodes []defines.Electrode
	var returnedFrame defines.Frame
	returnedFullDuration := 0
	returnedFramesAmount := len(uploadProtocolParams.Frames)
	ElectrodesMap := make(map[string]bool)

	//Generate electrodes map
	for _, frame := range uploadProtocolParams.Frames {
		returnedFullDuration += int(frame.Duration)
		for _, electrode := range frame.Electrodes {
			ElectrodesMap[electrode.ElectrodeId] = true
		}
	}

	for electrodeID, _ := range ElectrodesMap {
		returnedElectrodes = append(returnedElectrodes, defines.Electrode{ElectrodeId: electrodeID, Value: 1})
	}
	returnedFrame.Electrodes = returnedElectrodes
	return returnedFrame, returnedFullDuration, returnedFramesAmount
}
