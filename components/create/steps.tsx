import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepsForms from './stepsForms';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import config from '../../config';
import stylesThis from '../../pages/create/styles.module.scss';
import { connect } from 'react-redux'
import * as foroAction from '../../actions/foro'
import { bindActionCreators } from 'redux'

let steps:any = ['Subir imagen', 'Características', 'Confirmar'];

 function HorizontalLinearStepper(props:any) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [dataPost, setDataPost] = React.useState<any>(null);
  const [nameProduct, setNameProduct] = React.useState('');
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [stepApproved, setStepApproved] = React.useState(new Set<number>());


  React.useEffect(() =>{
     switch(props.typePost){
        case 1:
          steps = ['Subir imagen', 'Características', 'Confirmar']
          break;
        case 2:
          steps = ['Subir imagen', 'Características', 'Beneficios', 'Frecuencia de compra', 'Confirmar'];
          break;
        case 3:
          steps = ['Subir imagen', 'Características', 'Beneficios', 'Confirmar'];
          break;
     }
  },[])


  const isStepOptional = (step: number) => {
    switch(props.typePost){
      case 1:
        return false;
      case 2:
        return [2, 3].includes(step)
      case 3:
        return [2].includes(step)
   }
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onApproved = (valid: boolean, step: any) => {
    if (stepApproved.has(step)) {
      if (!valid) {
        let approv = stepApproved
        approv = new Set(approv.values());
        approv.delete(step);
        setStepApproved(approv);
      }
    } else {
      if (valid) {
        setStepApproved((prevStepApproved) => {
          const newStep = new Set(prevStepApproved.values());
          newStep.add(step);
          return newStep;
        });
      }
    }
  }

  const setFinish = (dataPost: any, name: string) => {
    setDataPost(dataPost);
    setNameProduct(name);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{flexWrap:'wrap', overflow: 'hidden'}} >
        {steps.map((label:any, index:any) => {
          const stepProps: { completed?: boolean } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <StepsForms
          index={activeStep}
          idPost={props.idPost}
          stepApproved={stepApproved}
          onApproved={onApproved}
          skipped={skipped}
          steps={steps.length}
          setFinish={setFinish} 
          typePost={props.typePost} />
      </React.Fragment>
      {activeStep === steps.length ? (
        <React.Fragment>
          <div style={{ textAlign: 'center' }} className={stylesThis.boxText}>
            {dataPost == null || props.isLoading ?
              <>
                <p>Publicando...</p>
                <CircularProgress color="success" />
              </>
              : (dataPost.hasOwnProperty('data') ?
                <>
                  <p>Se publicó exitosamente la recomendación del producto ecológico con nombre: </p>
                  <a
                    rel="noreferrer"
                    style={{ textDecoration: 'underline', color: "#3cb371" }}
                    href={config.url_web + "post/" + dataPost.data._id} target={'_blank'}> {nameProduct} </a>
                </> :
                <>
                  <p>No fue posible publicar la recomendación, por favor comunícaselo al soporte de Ecologeo.</p>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Intentar nuevamente</Button>
                  </Box>
                </>
              )
            }
          </div>

        </React.Fragment>
      ) : (
        <React.Fragment>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button

              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button onClick={handleSkip} sx={{ mr: 1 }}>
                Omitir
              </Button>
            )}
            <Button
              disabled={!stepApproved.has(activeStep)}
              onClick={handleNext}>
              {activeStep === steps.length - 1 ?(props.idPost === ''?'Publicar': 'Actualizar') : 'Siguiente'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  isLoading: state.foro.isLoading,
  dataForo: state.foro.dataForo,
  error: state.foro.error,
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(foroAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalLinearStepper);